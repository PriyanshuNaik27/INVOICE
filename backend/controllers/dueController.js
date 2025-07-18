import Customer from "../models/customer.model.js";
import Invoice from "../models/invoice.model.js";
import Payment from "../models/payment.model.js";

//  Get dues for ALL TIME
export const getAllDues = async () => {
  const customers = await Customer.find();
  const results = [];

  for (const customer of customers) {
    const invoiceAgg = await Invoice.aggregate([
      { $match: { customer: customer._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const paymentAgg = await Payment.aggregate([
      { $match: { customer: customer._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const invoices = invoiceAgg[0]?.total || 0;
    const payments = paymentAgg[0]?.total || 0;
    const due = invoices - payments;

    if (due > 0) {
      results.push({
        customer: customer.name,
        invoices,
        payments,
        due
      });
    }
  }

  return results;
};

//  Get dues for a specific month
export const getMonthlyDues = async ({ month, year }) => {
  const startDate = new Date(`${year}-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const customers = await Customer.find();
  const results = [];

  for (const customer of customers) {
    const invoiceAgg = await Invoice.aggregate([
      {
        $match: {
          customer: customer._id,
          date: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: { _id: null, total: { $sum: "$amount" } }
      }
    ]);

    const paymentAgg = await Payment.aggregate([
      {
        $match: {
          customer: customer._id,
          paymentDate: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: { _id: null, total: { $sum: "$amount" } }
      }
    ]);

    const invoices = invoiceAgg[0]?.total || 0;
    const payments = paymentAgg[0]?.total || 0;
    const due = invoices - payments;

    if (due > 0) {
      results.push({
        customer: customer.name,
        invoices,
        payments,
        due
      });
    }
  }

  return results;
};
