// controllers/queryController.js

import Invoice from '../models/invoice.js';

export const getDueCustomers = async (req, res) => {
  try {
    const today = new Date();
    const dueInvoices = await Invoice.find({
      dueDate: { $lte: today },
      isPaid: false
    }).populate('customer');

    const customersDue = dueInvoices.map(invoice => ({
      customerName: invoice.customer.name,
      dueAmount: invoice.amount,
      dueDate: invoice.dueDate
    }));

    res.json(customersDue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
