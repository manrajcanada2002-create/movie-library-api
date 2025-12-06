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
    }
  };

  return (
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
    </div>
  );
};

export default VerifyOtp;
