const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deactivateUser,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/:id", authMiddleware, getUserById);

router.put("/:id", authMiddleware, updateUser);

router.put("/deactivate/:id", authMiddleware, deactivateUser);

module.exports = router;
