const Customer = "../models/Customer";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new customer
const registerUser = async (req, res) => {
  const { name, email, password } = req.body();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Customer({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body();
  try {
    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, "jwtSecret", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await Customer.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update user details
const updateUser = async (req, res) => {
  try {
    const user = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Deactivate user
const deactivateUser = async (req, res) => {
  try {
    const user = await Customer.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deactivated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deactivateUser,
};
