const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log("Error logging in:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } else if (result.length > 0) {
      const match = await bcrypt.compare(password, result[0].password);

      if (match) {
        console.log("User logged in successfully");
        res.json({
          message: "User logged in successfully",
          token: "your_token",
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};
