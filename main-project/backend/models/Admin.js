// models/Admin.js

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin", // Assign a default role
  },
});

// Define a reference to the Customer model
adminSchema.virtual("customers", {
  ref: "Customer", // The model to use
  localField: "_id", // Find customers where `admin` is equal to `localField`
  foreignField: "admin", // Find customers where `admin` is equal to `foreignField`
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
