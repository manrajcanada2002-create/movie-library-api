<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "../context/AuthContext";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem("emailForOTP");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      login(res.data);
      navigate("/movies");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
=======
import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const VerifyOtp = ({ emailFromLogin }) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(emailFromLogin || "");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      const { token, role, email: userEmail } = res.data;
      login({ token, role, email: userEmail });
      setMessage("Login successful!");
      navigate("/movies");
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "OTP verification failed. Try again."
      );
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
    }
  };

  return (
<<<<<<< HEAD
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Verify OTP</h2>

        <form onSubmit={handleSubmit}>
          <label>OTP Code</label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP..."
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">
            Verify OTP
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
=======
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email (same as login)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
    </div>
  );
};

export default VerifyOtp;
