import express from 'express';
import { getDueCustomers } from '../controllers/queryController.js';
const router = express.Router();
router.get('/due-customers', getDueCustomers);
export default router;
