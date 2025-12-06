const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const sendOTPEmail = require("../utils/emailService"); 

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ email, password, role });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

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
});

module.exports = router;
