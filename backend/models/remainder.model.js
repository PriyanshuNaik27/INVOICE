import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
