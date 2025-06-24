import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("🎉 Registration successful! You can now login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#e6f0ff", // very light blue background
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
          border: "1px solid #b3c7ff", // soft blue border
          boxShadow: "0 6px 20px rgba(59, 130, 246, 0.15)", // subtle blue shadow
        }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#2563eb" }}>
          Create an Account
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
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#1e293b" }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control form-control-lg shadow-sm"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              style={{
                borderRadius: "10px",
                fontSize: "1rem",
                borderColor: "#93c5fd",
                boxShadow: "0 0 8px rgba(59, 130, 246, 0.15)",
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#1e293b" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg shadow-sm"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{
                borderRadius: "10px",
                fontSize: "1rem",
                borderColor: "#93c5fd",
                boxShadow: "0 0 8px rgba(59, 130, 246, 0.15)",
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#1e293b" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg shadow-sm"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              style={{
                borderRadius: "10px",
                fontSize: "1rem",
                borderColor: "#93c5fd",
                boxShadow: "0 0 8px rgba(59, 130, 246, 0.15)",
              }}
            />
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4" style={{ color: "#475569" }}>
          <span>Already have an account? </span>
          <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: "#2563eb" }}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
