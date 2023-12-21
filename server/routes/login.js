const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Login route
app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ message: "Invalid email or password" });
    }

    // Verify the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, "secretkey");

    res.send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

// Forgot password route
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ message: "User not found" });
    }

    const token = jwt.sign({ email: user.email }, "reset-secret-key", { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      // configure your email provider here
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: user.email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send({ message: "Error sending email" });
      }
      res.send({ message: "Password reset email sent" });
    });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

// Reset password route
app.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, "reset-secret-key");

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.send({ message: "Invalid token" });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send({ message: "Password reset successful" });
  } catch (error) {
    res.send({ message: "Invalid token" });
  }
});

module.exports = app;
