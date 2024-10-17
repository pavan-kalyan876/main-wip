const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware"); // Ensure this path is correct
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deactivateUser,
} = require("../controllers/userController");

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", authMiddleware, getUserById); // This line uses authMiddleware
router.put("/:id", authMiddleware, updateUser);
router.put("/deactivate/:id", authMiddleware, deactivateUser);

module.exports = router;
