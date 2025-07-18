
import Customer from '../models/customer.model.js';
import Invoice from '../models/invoice.model.js';

function parseDateWithFallback(inputDateStr) {
  const today = new Date();
  let parsedDate = new Date(inputDateStr);

  if (isNaN(parsedDate)) {
    throw new Error("Invalid date format");
  }

  // If year not given and parsedDate is in the past, assume next year
  if (parsedDate < today && inputDateStr.match(/^\d{1,2}\s\w+$/i)) {
    parsedDate.setFullYear(today.getFullYear() +1);
  }

  return parsedDate;
}


export const addInvoice = async ({ name, amount, date }) => {
  try {
    const customerName = name.trim().toLowerCase();

    // 1. Find or create customer
    let customer = await Customer.findOne({ name: customerName });
    if (!customer) {
      customer = await Customer.create({ name: customerName });
    }

    // 2. Create the invoice
    const invoice = await Invoice.create({
      customer: customer._id,
      amount,
      date: date ? parseDateWithFallback(date) : Date.now(),
    });

    // 3. Return useful data
    return {
      id: invoice._id,
      customer: customer.name,
      amount: invoice.amount,
      date: invoice.date,
    };
  } catch (error) {
    console.error("❌ Error in addInvoice service:", error.message);
    throw new Error("Failed to add invoice");
  }
};


export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('customer');
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};














