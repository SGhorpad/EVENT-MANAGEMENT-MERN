import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Shared style for each nav link container
  const linkContainerStyle = {
    border: "1.5px solid transparent",
    borderRadius: "8px",
    padding: "6px 12px",
    transition: "all 0.3s ease",
  };

  // Style for mouse hover (will be applied via inline event handlers)

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        padding: "1rem 2rem",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold fs-3 text-white"
          to="/"
          style={{ letterSpacing: "1.5px" }}
        >
          EventEase
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "rgba(255, 255, 255, 0.7)" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)", width: "30px", height: "30px" }}
          />
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav align-items-center">
            {[
              { to: "/", label: "Home" },
              { to: "/events", label: "Events" },
              { to: "/chat", label: "Chat" },
              ...(user && user.role === "admin"
                ? [{ to: "/admin", label: "Admin Panel" }]
                : []),
              ...(user
                ? [{ to: "/dashboard", label: "Dashboard" }]
                : []),
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="nav-link text-white mx-2 fw-semibold"
                style={linkContainerStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffc107";
                  e.currentTarget.style.color = "#000";
                  e.currentTarget.style.borderColor = "#ffc107";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                {label}
              </Link>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-warning btn-sm ms-3 rounded-pill fw-semibold d-flex align-items-center"
                style={{ gap: "0.4rem", boxShadow: "0 3px 6px rgba(0,0,0,0.15)" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#ffc107";
                  e.target.style.color = "#000";
                  e.target.style.boxShadow = "0 5px 12px rgba(0,0,0,0.3)";
                  e.target.style.borderColor = "#ffc107";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "";
                  e.target.style.boxShadow = "0 3px 6px rgba(0,0,0,0.15)";
                  e.target.style.borderColor = "transparent";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15a1 1 0 0 0 1-1v-3H4.5a.5.5 0 0 1 0-1H11V2a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L14.293 7.5H7.5a.5.5 0 0 0 0 1h6.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link text-white mx-2 fw-semibold"
                  style={linkContainerStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffc107";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.borderColor = "#ffc107";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="nav-link text-white mx-2 fw-semibold"
                  style={linkContainerStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffc107";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.borderColor = "#ffc107";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
