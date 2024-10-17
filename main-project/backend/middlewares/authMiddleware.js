const jwt = require("jsonwebtoken");

// Middleware to check for a valid token
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key"); // Replace 'your_secret_key' with your actual secret
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

module.exports = authMiddleware;
