import express from 'express';
import { createCustomer, getAllCustomers } from '../controllers/customerController.js';
const router = express.Router();
router.post('/', createCustomer);
router.get('/', getAllCustomers);
export default router;
