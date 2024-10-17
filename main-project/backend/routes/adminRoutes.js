// routes/adminRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getCustomers,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware"); // Ensure this middleware verifies the admin

// Admin routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/customers", authMiddleware, getCustomers); // Protect this route with auth

module.exports = router;
