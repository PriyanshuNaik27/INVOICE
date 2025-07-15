
import Customer from '../models/customer.model.js';
import Invoice from '../models/invoice.js';

export const addInvoice = async (req, res) => {
  try {
    const { name, amount, invoiceDate } = req.body;
    const customerName = name.trim();

  // find if the user ezits or not
  let customer = await Customer.findOne({ name: customerName });
  if (!customer) {
    // if not, create a new customer
    customer = await Customer.create({ name: customerName });
  }

  // here we create the invoice
  const invoice = await Invoice.create({
    customer: customer._id,
    amount,
    date: invoiceDate,
  });

  res.status(201).json({
    message: 'Invoice created successfully',
    invoice: {
      id: invoice._id,
      customer: customer.name,
      amount: invoice.amount,
      date: invoice.date,
    },
  });
  } catch (error) {
    console.error("❌ Error in addInvoice:", error.message);
    res.status(500).json({ message: error.message });
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














