import React, { useState } from "react";
import api from "../api/api";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
=======

const Login = ({ onOtpRequested }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
<<<<<<< HEAD

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("emailForOTP", email);
      navigate("/verify-otp");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed.");
=======
    try {
      const res = await api.post("/auth/login", { email, password });
      setMessage(res.data.message || "OTP sent. Check your email.");
      if (onOtpRequested) {
        onOtpRequested(email);
      }
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Login failed. Please check credentials."
      );
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
    }
  };

  return (
<<<<<<< HEAD
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">
            Request OTP
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
=======
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">Request OTP</button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
    </div>
  );
};

export default Login;
