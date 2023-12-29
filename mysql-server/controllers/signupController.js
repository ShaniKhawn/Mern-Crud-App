const bcrypt = require("bcrypt");
const db = require("../models/db");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      }

      console.log("User registered successfully");
      res.json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
