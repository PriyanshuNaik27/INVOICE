import express from 'express';
import { createInvoice, getAllInvoices } from '../controllers/invoiceController.js';
const router = express.Router();
router.post('/', createInvoice);
router.get('/', getAllInvoices);
export default router;
