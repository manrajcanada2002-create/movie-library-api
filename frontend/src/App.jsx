import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import MovieList from "./pages/MovieList";
import MovieForm from "./pages/MovieForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const [emailForOtp, setEmailForOtp] = useState("");
  const { token, role, email, logout } = useAuth();

  return (
    <div>
      <nav
        style={{
          padding: "0.75rem 1rem",
          backgroundColor: "#222",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link to="/movies" style={{ color: "#fff", marginRight: "1rem" }}>
            Movies
          </Link>
        </div>
        <div>
          {token ? (
            <>
              <span style={{ marginRight: "1rem" }}>
                Logged in as {email} ({role})
              </span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{ color: "#fff", marginRight: "1rem" }}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/movies" replace />}
        />
        <Route
          path="/login"
          element={
            <Login
              onOtpRequested={(email) => {
                setEmailForOtp(email);
              }}
            />
          }
        />
        <Route
          path="/verify-otp"
          element={<VerifyOtp emailFromLogin={emailForOtp} />}
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <MovieList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/new"
          element={
            <ProtectedRoute>
              <MovieForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/edit/:id"
          element={
            <ProtectedRoute>
              <MovieForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
