// controllers/adminController.js

const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new admin
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin Not Found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || "yourDefaultSecret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all customers associated with the admin
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ admin: req.admin._id }); // Use req.admin._id to find customers
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getCustomers,
};
