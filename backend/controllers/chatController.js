import axios from 'axios';
import { addInvoice } from './invoiceController.js';
const WIT_API_TOKEN=process.env.WIT_API_TOKEN;

export const processChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ response: "Message is required." });
    }

    const witRes = await axios.get(
      `https://api.wit.ai/message?v=20250715&q=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: WIT_API_TOKEN
        }
      }
    );

    const { intents, entities } = witRes.data;
    const intent = intents?.[0]?.name;
    const confidence = intents?.[0]?.confidence || 0;

    if (!intent || confidence < 0.2) {
      return res.json({ response: "Sorry, I didn't understand that clearly." });
    }
    console.log("🔍 Entities:", JSON.stringify(entities, null, 2));

    const name = entities['customer_name:customer_name']?.[0]?.value?.trim().toLowerCase();
    const amount =
    entities['wit$amount_of_money:amount_of_money']?.[0]?.value ??
    entities['wit$amount_of_money']?.[0]?.value ??
    entities['wit$amount_of_money:amount']?.[0]?.value ??
    entities['amount:amount']?.[0]?.value ??
    entities['amount']?.[0]?.value;

    const date = entities['wit$datetime:datetime']?.[0]?.value;

    if (intent === 'add_invoice') {
      console.log(name);
      console.log(amount);
      if (!name || !amount) {
        return res.json({ response: "Please provide both customer name and amount." });
      }

      const invoice = await addInvoice({ name, amount, date });

      return res.json({
        response: `✅ Invoice of ₹${amount} added for ${name} on ${new Date(invoice.date).toDateString()}.`
      });
    }
    if (intent === 'add_reminder') {
      console.log(name);
      console.log(amount);
      if (!name || !amount) {
        return res.json({ response: "Please provide both customer name and amount." });
      }

      const invoice = await addReminder({ title, dueDate });

      return res.json({
        response: `✅ Invoice of ₹${amount} added for ${name} on ${new Date(invoice.date).toDateString()}.`
      });
    }

    return res.json({ response: "Intent recognized but not supported yet." });

  } catch (error) {
    console.error("❌ Error in chatController:", error.message);
    res.status(500).json({ response: "Internal server error." });
  }
};
