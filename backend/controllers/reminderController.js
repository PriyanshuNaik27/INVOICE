// controllers/reminderController.js

import Reminder from '../models/remainder.model.js';

export const addReminder = async (req, res) => {
  try {
    const { title, dueDate } = req.body;

    // Create the reminder
    const reminder = await Reminder.create({
      title: title.trim(),
      dueDate: new Date(dueDate),
    });

    res.status(201).json({
      message: 'Reminder created successfully',
      reminder: {
        id: reminder._id,
        title: reminder.title,
        dueDate: reminder.dueDate,
      },
    });
  } catch (error) {
    console.error("❌ Error in addReminder:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

