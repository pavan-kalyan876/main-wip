const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]; // Retrieve token from headers
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "jwtSecret", (err, decoded) => {
    // Use the same secret as when signing
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded.id; // Save the user ID for use in other routes
    next(); // Continue to the next middleware or route handler
  });
};

module.exports = authMiddleware;
