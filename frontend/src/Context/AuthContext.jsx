import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState("");

  // LOGIN
  const login = async (form) => {
    try {
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      navigate("/feed");

    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  // REGISTER
  const register = async (form) => {
    try {
      setError("");

      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      navigate("/login");

    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);