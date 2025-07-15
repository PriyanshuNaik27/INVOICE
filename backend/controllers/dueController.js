import Customer from "../models/customer.model.js";
import Invoice from "../models/invoice.model.js";
import Payment from "../models/payment.model.js";

export const getCustomerDue = async (req, res) => {
  try {
    const customerName = req.params.customerName.trim().toLowerCase();

    // 1. Find customer
    const customer = await Customer.findOne({ name: customerName });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // 2. Sum invoices
    const invoiceTotal = await Invoice.aggregate([
      { $match: { customer: customer._id } },/// ye filter karta hai 
      { $group: { _id: null, total: { $sum: "$amount" } } } // ye total amount nikalta hai
    ]);

    const totalInvoices = invoiceTotal[0]?.total || 0;

    // 3. Sum payments
    const paymentTotal = await Payment.aggregate([
      { $match: { customer: customer._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalPayments = paymentTotal[0]?.total || 0;

    // 4. Calculate due
    const due = totalInvoices - totalPayments;

    res.json({
      customer: customer.name,
      totalInvoices,
      totalPayments,
      due
    });

  } catch (error) {
    console.error("❌ Error in getCustomerDue:", error.message);
    res.status(500).json({ message: error.message });
  }
};
