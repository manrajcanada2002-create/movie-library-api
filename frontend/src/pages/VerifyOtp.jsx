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
    }
  };

  return (
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
    </div>
  );
};

export default VerifyOtp;
