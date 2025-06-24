import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={styles.container}>
        <h2 style={{ color: "#ef4444" /* soft red for alert */ }}>
          Please log in to access the Dashboard.
        </h2>
        <button style={styles.loginButton} onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.welcomeText}>
          Welcome, <span style={styles.username}>{user.username}</span>! 
        </h1>
        <p style={styles.infoText}>
           Email: <strong>{user.email}</strong>
        </p>
        <p style={styles.infoText}>
           Role:{" "}
          <strong
            style={{
              color: user.role === "admin" ? "#2563eb" : "#3b82f6",
            }}
          >
            {user.role.toUpperCase()}
          </strong>
        </p>

        {user.role === "admin" ? (
          <div style={styles.panelAdmin}>
            <h2 style={styles.adminPanelHeading}>Admin Panel</h2>
            <div style={styles.buttonsWrapper}>
              <button
                style={{ ...styles.button, backgroundColor: "#2563eb" }}
                onClick={() => navigate("/create")}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
              >
                ➕ Create New Event
              </button>
              <button
                style={{ ...styles.button, backgroundColor: "#3b82f6" }}
                onClick={() => navigate("/admin/users")}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
              >
                👥 Manage Users
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.panelUser}>
            <h2 style={styles.userPanelHeading}>User Panel</h2>
            <div style={styles.buttonsWrapper}>
              <button
                style={{ ...styles.button, backgroundColor: "#3b82f6" }}
                onClick={() => navigate("/events")}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
              >
                📅 Browse Events
              </button>
              <button
                style={{ ...styles.button, backgroundColor: "#60a5fa" }}
                onClick={() => navigate("/myrsvps")}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#3b82f6")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#60a5fa")}
              >
                ✅ My RSVPs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #e0e7ff, #f0f4ff)", // subtle blue gradient
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "50px 40px", 
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "white",
    borderRadius: "14px",
    boxShadow: "0 12px 28px rgba(59, 130, 246, 0.2)",
    border: "1px solid #cbd5e1", // lighter blue-gray border
  },
  welcomeText: {
    color: "#1e293b",
    marginBottom: "16px",
    fontWeight: "700",
    fontSize: "2.6rem",
  },
  username: {
    color: "#2563eb",
  },
  infoText: {
    fontSize: "18px",
    color: "#475569",
    margin: "8px 0",
  },
  panelAdmin: {
    marginTop: "48px",
    borderTop: "3px solid #2563eb",
    paddingTop: "30px",
  },
  panelUser: {
    marginTop: "48px",
    borderTop: "3px solid #3b82f6",
    paddingTop: "30px",
  },
  adminPanelHeading: {
    fontSize: "2rem",
    color: "#1e40af",
    marginBottom: "28px",
    fontWeight: "700",
  },
  userPanelHeading: {
    fontSize: "2rem",
    color: "#2563eb",
    marginBottom: "28px",
    fontWeight: "700",
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  button: {
    flex: "1 1 220px",
    padding: "14px 0",
    color: "white",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "700",
    boxShadow: "0 8px 20px rgba(59, 130, 246, 0.35)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease",
    userSelect: "none",
  },
  loginButton: {
    marginTop: "20px",
    padding: "14px 30px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "700",
    boxShadow: "0 6px 20px rgba(239, 68, 68, 0.45)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
};

export default Dashboard;
