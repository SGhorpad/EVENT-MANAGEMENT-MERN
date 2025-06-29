import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); // Default role is user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("https://event-management-mern-1owy.onrender.com/api/auth/login", {
        email,
        password,
        role,
      });

      login({ ...res.data.user, token: res.data.token });
      navigate("/");
    } catch (err) {
      setError("Login failed: Invalid email, password, or role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        ::placeholder {
          font-size: 0.85rem;
          opacity: 0.7;
        }
      `}</style>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "#e6f0ff",
          padding: "20px",
        }}
      >
        <div
          className="p-5 rounded-4 shadow"
          style={{
            width: "100%",
            maxWidth: 430,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
            border: "1px solid #b3c7ff",
            boxShadow: "0 6px 20px rgba(59, 130, 246, 0.15)",
          }}
        >
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#2563eb" }}>
            Login to Your Account
          </h2>

          {error && (
            <div
              className="alert alert-danger text-center py-2"
              style={{ backgroundColor: "#f8d7da", color: "#842029" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 d-flex justify-content-center gap-4">
              <label style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                  style={{ marginRight: "6px" }}
                />
                User Login
              </label>
              <label style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                  style={{ marginRight: "6px" }}
                />
                Admin Login
              </label>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: "#1e293b" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control form-control-lg shadow-sm"
                style={{
                  borderRadius: "10px",
                  fontSize: "0.85rem",
                  borderColor: "#93c5fd",
                  boxShadow: "0 0 8px rgba(59, 130, 246, 0.15)",
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#1e293b" }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control form-control-lg shadow-sm"
                style={{
                  borderRadius: "10px",
                  borderColor: "#93c5fd",
                  boxShadow: "0 0 8px rgba(59, 130, 246, 0.15)",
                }}
              />
            </div>

            <div className="text-end mb-4">
              <Link
                to="/forgot-password"
                className="text-decoration-none fw-semibold"
                style={{ color: "#2563eb" }}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-lg w-100 text-white fw-semibold"
              style={{
                background: "#3b82f6",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                transition: "0.3s",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4" style={{ color: "#475569" }}>
            <span>Don't have an account? </span>
            <Link
              to="/register"
              className="fw-semibold text-decoration-none"
              style={{ color: "#2563eb" }}
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
