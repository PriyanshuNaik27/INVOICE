import { addInvoice } from "./invoiceController.js";
import { addPayment } from "./paymentController.js";
import { getMonthlyDues, getAllDues } from "../controllers/dueController.js";
import { addReminder, getAllReminders } from "./reminderController.js";
import { getDuesOfCustomer } from "../controllers/dueController.js";

import { OpenAI } from "openai";

export const processChat = async (req, res) => {
  // const WIT_API_TOKEN = process.env.WIT_TOKEN;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ response: "Message is required." });
    }

    const prompt = `
You are an AI assistant that extracts intent and entities from user messages for an invoicing app.
Given a message, respond in JSON format like:
{
  "intent": "add_invoice" | "record_payment" | "get_all_dues" | "get_monthly_dues" | "add_reminder" | "get_all_reminders" | "get_all_dues_of_customer",
  "confidence": 0.95,
  "entities": {
    "name": "...",
    "amount": 1000,
    "date": "2025-07-20",
    "title": "..."
  }
}

Message: "${message}"
`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts structured data.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    let parsed;
    try {
      parsed = JSON.parse(completion.choices[0].message.content);
    } catch (e) {
      return res.json({
        response: "Sorry, I couldn't understand your request.Also note that receipt and payment are the same",
      });
    }

    const { intent, confidence, entities } = parsed;

    const getname = entities?.name;
    const amount = entities?.amount;
    const date = entities?.date;
    const title = entities?.title;
    const name = getname.toLowerCase();

    if (!intent || confidence < 0.7) {
      return res.json({ response: "Sorry, I didn't understand that clearly." });
    }

    //1. add invoice
    if (intent === "add_invoice") {
      // console.log(name);
      // console.log(amount);
      if (!name && !amount) {
        return res.json({
          response: "Please provide both customer name and amount.",
        });
      }
      if (!amount) {
        return res.json({ response: "Please provide amount." });
      }
      if (!name) {
        return res.json({ response: "Please provide customer name." });
      }

      const invoice = await addInvoice({ name, amount, date });

      return res.json({
        response: `✅ Invoice of ₹${amount} added for ${name} on ${new Date(
          invoice.date
        ).toDateString()}.`,
      });
    }

    //2. record payment
    if (intent === "record_payment") {
      // console.log(name);
      // console.log(amount);
      if (!name && !amount) {
        return res.json({
          response: "Please provide both customer name and amount.",
        });
      }
      if (!amount) {
        return res.json({ response: "Please provide amount." });
      }
      if (!name) {
        return res.json({ response: "Please provide customer name." });
      }

      const payment = await addPayment({ name, amount, date });

      return res.json({
        response: `✅ Payment of ₹${amount} by ${name} on ${new Date(
          payment.paymentDate || Date.now()
        ).toDateString()}.`,
      });
    }

    //3.get all dues

    if (intent === "get_all_dues") {
      const dues = await getAllDues();

      if (dues.length === 0) {
        return res.json({ response: "No customer has any pending dues." });
      }

      const responseLines = dues.map(
        (d) =>
          `• ${d.customer}: ₹${d.due} (Invoices: ₹${d.invoices}, Payments: ₹${d.payments})`
      );

      return res.json({
        response: `📌 All-time dues:\n` + responseLines.join("\n"),
      });
    }

    //4. 🟡 Monthly dues (e.g. "Dues in July 2025")
    if (intent === "get_monthly_dues") {
      const datetime = entities["wit$datetime:datetime"]?.[0]?.value;

      if (!datetime) {
        return res.json({ response: "Please specify a month and year." });
      }

      const dateObj = new Date(datetime);
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear());

      const dues = await getMonthlyDues({ month, year });

      if (dues.length === 0) {
        return res.json({
          response: `No dues in ${dateObj.toLocaleString("default", {
            month: "long",
          })} ${year}.`,
        });
      }

      const responseLines = dues.map(
        (d) =>
          `• ${d.customer}: ₹${d.due} (Invoices: ₹${d.invoices}, Payments: ₹${d.payments})`
      );

      return res.json({
        response:
          `📅 Dues for ${dateObj.toLocaleString("default", {
            month: "long",
          })} ${year}:\n` + responseLines.join("\n"),
      });
    }
    // 5.Add Reminder
    if (intent === "add_reminder") {
     const title = entities?.title || message;
  const dueDate = entities?.date;

      if (!title || !dueDate) {
        return res.json({
          response: "Please provide reminder title and date.",
        });
      }

      const remainder = addReminder({ title, dueDate });
      if (!remainder) {
        return res.json({ response: "Failed to set reminder." });
      }
      return res.json({
        response: `✅ Reminder set: "${title}" on ${new Date(
          dueDate
        ).toDateString()}.`,
      });
    }

    //6. Get All Reminders
    if (intent === "get_all_reminders") {
      const reminders = await getAllReminders();
      
      if (reminders.length === 0) {
        return res.json({ response: "No reminders found." });
      }

      const responseLines = reminders.map(
        (r) => `• "${r.title}" on ${new Date(r.dueDate).toDateString()}`
      );

      return res.json({
        response: `📅 All reminders:\n` + responseLines.join("\n"),
      });
    }

    // 7. Get dues of specific customer
if (intent === "get_all_dues_of_customer") {
  if (!name) {
    return res.json({ response: "Please provide the customer name." });
  }else{
    console.log(name);
  }

  try {
    const dues = await getDuesOfCustomer({ name });

    if (!dues || dues.due <= 0) {
      return res.json({ response: `${name} has no pending dues.` });
    }

    return res.json({
      response: `📌 ${dues.customer}'s Dues:\n• Total Due: ₹${dues.due}\n• Invoices: ₹${dues.invoices}\n• Payments: ₹${dues.payments}`,
    });
  } catch (err) {
    return res.json({ response: "Customer not found." });
  }
}

    return res.json({ response: "Intent recognized but not supported yet." });
  } catch (error) {
    console.error("❌ Error in chatController:", error.message);
    res.status(500).json({ response: "Internal server error." });
  }

  
};
