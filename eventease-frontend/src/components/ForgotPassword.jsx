import { useState } from "react";
import axios from "axios";



export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMsg("");
  setError("");

  // Email validation
  if (!/\S+@\S+\.\S+/.test(email)) {
    setError("Please enter a valid email");
    return;  // Stop execution if email invalid
  }

  setLoading(true);

  try {
    const res = await axios.post("https://event-management-mern-1owy.onrender.com/api/auth/forgot-password", { email });
    setMsg(res.data.message);
    setEmail("");
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password?</h2>
        <p style={styles.info}>Enter your registered email address below and we'll send you a link to reset your password.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            disabled={loading}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
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
    backgroundColor: "#e0f2fe", // soft sky blue
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
    backgroundColor: "#667eea",
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
