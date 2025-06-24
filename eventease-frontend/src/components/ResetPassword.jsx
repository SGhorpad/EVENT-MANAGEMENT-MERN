import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token: rawToken } = useParams();
  const token = decodeURIComponent(rawToken);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", { token, password });
      setMsg(res.data.message);
      setPassword("");
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your component code unchanged

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.info}>Enter your new password below.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={styles.input}
            disabled={loading}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {msg && <p style={{ ...styles.message, color: "green" }}>{msg}</p>}
        {error && <p style={{ ...styles.message, color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3e8ff", // soft lavender purple
    padding: "1rem",
  },
  card: {
    background: "#ffffff",
    padding: "2.5rem 3rem",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
 
  title: {
    marginBottom: "0.5rem",
    color: "#333",
    fontWeight: "700",
  },
  info: {
    marginBottom: "1.5rem",
    color: "#555",
    fontSize: "0.95rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  button: {
    padding: "12px 15px",
    backgroundColor: "#ff758c",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  message: {
    marginTop: "1rem",
    fontWeight: "600",
  },
};
