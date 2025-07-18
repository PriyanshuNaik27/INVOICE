// controllers/paymentController.js

import Payment from '../models/payment.model.js';
import Customer from '../models/customer.model.js';

export const addPayment = async ({ name, amount, date }) => {
  try {
   
    const customerName = name.trim().toLowerCase();

    // Find if the customer exists
    let customer = await Customer.findOne({ name: customerName });
    if (!customer) {
      // If not, create a new customer
      customer = await Customer.create({ name: customerName });
    }

    // Create the payment
    const payment = await Payment.create({
      customer: customer._id,
      amount,
      paymentDate: date || Date.now(),
    });

    return {
      id: payment._id,
      customer: customer.name,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
    };

    
  } catch (error) {
    console.error("❌ Error in addPayment:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('customer');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};