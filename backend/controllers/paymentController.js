// controllers/paymentController.js

import Payment from '../models/payment.js';

export const createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
