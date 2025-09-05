const express = require("express");
const { saveUserDetails } = require("../controllers/usercontroller");
const jwt = require("jsonwebtoken");

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

router.post("/save", authMiddleware, saveUserDetails);

module.exports = router;
