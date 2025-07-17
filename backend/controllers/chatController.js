import axios from "axios";
import { addInvoice } from "./invoiceController.js";
import { addPayment } from "./paymentController.js";
import { getMonthlyDues, getAllDues } from "../controllers/dueController.js";

export const processChat = async (req, res) => {
  const WIT_API_TOKEN = process.env.WIT_TOKEN;
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ response: "Message is required." });
    }

    const witRes = await axios.get(
      `https://api.wit.ai/message?v=20250715&q=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: WIT_API_TOKEN,
        },
      }
    );

    const { intents, entities } = witRes.data;
    const intent = intents?.[0]?.name;
    const confidence = intents?.[0]?.confidence || 0;

    if (!intent || confidence < 0.8) {
      return res.json({ response: "Sorry, I didn't understand that clearly." });
    }
    console.log("🔍 Entities:", JSON.stringify(entities, null, 2));

    const name = entities["customer_name:customer_name"]?.[0]?.value
      ?.trim()
      .toLowerCase();
    const amount =
      entities["wit$amount_of_money:amount_of_money"]?.[0]?.value ??
      entities["wit$amount_of_money"]?.[0]?.value ??
      entities["wit$amount_of_money:amount"]?.[0]?.value ??
      entities["amount:amount"]?.[0]?.value ??
      entities["amount"]?.[0]?.value;

    const date = entities["wit$datetime:datetime"]?.[0]?.value;

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
          payment.paymentDate
        ).toDateString()}.`,
      });
    }

    //due

   
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

     // 🟡 Monthly dues (e.g. "Dues in July 2025")
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


    return res.json({ response: "Intent recognized but not supported yet." });
  } catch (error) {
    console.error("❌ Error in chatController:", error.message);
    res.status(500).json({ response: "Internal server error." });
  }
};
