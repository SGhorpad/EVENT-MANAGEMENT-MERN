import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyRSVPList = () => {
  const { id } = useParams(); // event ID if any
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCancelRSVP = async (eventId) => {
    if (!window.confirm("Are you sure you want to cancel your RSVP?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/rsvp/${eventId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData((prev) => prev.filter((event) => event._id !== eventId));
      setSuccess("✅ RSVP cancelled successfully!");
    } catch (err) {
      console.error("Cancel RSVP error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to cancel RSVP.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (id) {
          res = await axios.get(`http://localhost:5000/api/events/${id}/rsvps`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setData(res.data.rsvps);
        } else {
          res = await axios.get(`http://localhost:5000/api/rsvp/myrsvps`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setData(res.data);
        }
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchData();
    } else {
      setError("You must be logged in.");
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #cbd5e1 0%, #e0e7ff 60%, #f3e8ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="shadow"
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "30px",
          maxWidth: "700px",
          width: "100%",
          boxShadow: "0 8px 24px rgba(79, 70, 229, 0.15)",
          minHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setError("")}
            ></button>
          </div>
        )}

        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setSuccess("")}
            ></button>
          </div>
        )}

        {id ? (
          <>
            <h2 className="mb-4 text-center" style={{ color: "#4f46e5" }}>
              Users Who RSVped for Event
            </h2>
            {data.length === 0 ? (
              <p className="text-center">No RSVPs found for this event.</p>
            ) : (
              <ul className="list-group">
                {data.map((user) => (
                  <li
                    key={user._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{user.username}</strong> — {user.email}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <h2 className="mb-4 text-center" style={{ color: "#4f46e5" }}>
              Events You Have RSVped To
            </h2>
            {data.length === 0 ? (
              <p className="text-center">You have not RSVP’d to any events yet.</p>
            ) : (
              <ul className="list-group">
                {data.map((event) => (
                  <li
                    key={event._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{event.title}</strong> —{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancelRSVP(event._id)}
                    >
                      Cancel RSVP
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyRSVPList;
