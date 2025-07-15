import express from 'express';
import { createReminder, getAllReminders } from '../controllers/reminderController.js';
const router = express.Router();
router.post('/', createReminder);
router.get('/', getAllReminders);
export default router;
















------