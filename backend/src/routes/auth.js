<<<<<<< HEAD
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const sendOTPEmail = require("../utils/emailService"); 

// REGISTER
=======

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// Helper: create transporter using environment variables
const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set. OTP emails will not actually send.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
};

// Register (for initial setup / testing)
// You can manually create an admin by sending { email, password, role: "admin" }
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

<<<<<<< HEAD
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ email, password, role });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch {
=======
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      email,
      password,
      role: role || "user",
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
    res.status(500).json({ message: "Server error" });
  }
});

<<<<<<< HEAD
// LOGIN → Generate OTP + Send Email
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await user.comparePassword(password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  // Generate OTP
  user.otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otpExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();

  // ⭐ Send OTP to Gmail (NO console OTP anymore)
  try {
    await sendOTPEmail(email, user.otp);
  } catch (err) {
    console.error("Email sending failed:", err);
    return res.status(500).json({ message: "Failed to send OTP email" });
  }

  res.json({ message: "OTP sent to your email!" });
});

// VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email" });

  if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
  if (user.otpExpiry < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.json({ token, role: user.role, email: user.email });
=======
// Login: validate email & password, generate OTP and send via email
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate 6-digit OTP
    const otp = ("" + Math.floor(100000 + Math.random() * 900000)).substring(0, 6);
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    // Send OTP email
    const transporter = createTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Your Movie Library OTP Code",
          text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
        });
        console.log("✅ OTP email sent");
      } catch (emailErr) {
        console.error("Error sending OTP email:", emailErr);
      }
    } else {
      console.log("Skipping sending OTP email because transporter is not configured.");
      console.log("Generated OTP was:", otp);
    }

    res.json({ message: "OTP generated and sent (if email configured)", email: user.email });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Verify OTP: issue JWT on success
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: "OTP not found. Please login again." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP has expired. Please login again." });
    }

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "dev_secret", {
      expiresIn: "1h",
    });

    res.json({
      message: "OTP verified successfully",
      token,
      role: user.role,
      email: user.email,
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Server error" });
  }
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
});

module.exports = router;
