
import Customer from '../models/customer.model.js';
import Invoice from '../models/invoice.model.js';

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
      date,
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


export const getAllInvoices = async () => {
  try {
    const invoices = await Invoice.find().populate('customer');

    // Transform data for output (optional)
    const formattedInvoices = invoices.map(inv => ({
      id: inv._id,
      customer: inv.customer ? inv.customer.name : null,
      amount: inv.amount,
      date: inv.date,
    }));

    return formattedInvoices;

  } catch (error) {
    console.error("❌ Error in getAllInvoices service:", error.message);
    throw new Error("Failed to fetch invoices");
  }
};


















