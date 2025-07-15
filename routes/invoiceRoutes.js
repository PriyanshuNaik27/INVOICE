import express from 'express';
import {addInvoice,getAllInvoices } from '../controllers/invoiceController.js';
const router = express.Router();
router.post('/', addInvoice);
router.get('/', getAllInvoices);
export default router;
