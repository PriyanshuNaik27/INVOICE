// controllers/reminderController.js

import Reminder from '../models/remainder.model.js';

export const addReminder = async ({ title, dueDate }) => {
  try {
    // Create the reminder
    const reminder = await Reminder.create({
      title: title.trim(),
      dueDate: new Date(dueDate),
    });

    return {
        id: reminder._id,
        title: reminder.title,
        dueDate: reminder.dueDate,
      };
    
  } catch (error) {
    console.error("❌ Error in addReminder:", error.message);
    res.status(500).json({ message: error.message });
  }
};
export const getAllReminders = async () => {
  try {
    const reminders = await Reminder.find().sort({ dueDate: 1 });
    return reminders; // 
  } catch (error) {
    console.error("❌ Error in getAllReminders:", error.message);
    return []; 
  }
};