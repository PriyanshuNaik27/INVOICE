import express from 'express';
import { addReminder, getAllReminders } from '../controllers/reminderController.js';
const router = express.Router();
router.post('/', addReminder);
router.get('/', getAllReminders);
export default router;
















