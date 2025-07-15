import express from 'express';
import { addPayment, getAllPayments } from '../controllers/paymentController.js';
const router = express.Router();
router.post('/', addPayment);
router.get('/', getAllPayments);
export default router;
