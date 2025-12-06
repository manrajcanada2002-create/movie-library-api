import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    email: localStorage.getItem("email"),
  });

  const navigate = useNavigate();

  const login = ({ token, role, email }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);

    setUser({ token, role, email });
    navigate("/movies");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
