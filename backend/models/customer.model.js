import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
},{
    timestamps: true,
});


customerSchema.pre('save', function (next) {
  this.name = this.name.toLowerCase();
  next();
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer