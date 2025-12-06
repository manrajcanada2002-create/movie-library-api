import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import MovieList from "./pages/MovieList";
import MovieForm from "./pages/MovieForm";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/add" element={<MovieForm />} />
          <Route path="/edit/:id" element={<MovieForm />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
