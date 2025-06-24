import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [hasRSVPed, setHasRSVPed] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://event-management-mern-1owy.onrender.com/api/events/${id}`);
        setEvent(res.data);

        // Check if user already RSVPed
        if (user && res.data.rsvps) {
          const alreadyRSVPed = res.data.rsvps.some(
            (u) => u._id === user._id || u._id === user.id
          );
          setHasRSVPed(alreadyRSVPed);
        } else {
          setHasRSVPed(false);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user]);

  const handleRSVP = async () => {
    if (!user) {
      alert("Please login to RSVP.");
      return navigate("/login");
    }

    try {
      setRsvpLoading(true);
      setRsvpError("");

      await axios.post(
        `https://event-management-mern-1owy.onrender.com/api/events/${id}/rsvp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("RSVP successful!");
      setHasRSVPed(true);
    } catch (error) {
      setRsvpError(error.response?.data?.message || "Failed to RSVP.");
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`https://event-management-mern-1owy.onrender.com/api/events/${id}`);
        alert("Event deleted successfully.");
        navigate("/events");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete the event.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          backgroundColor: "#6b7280",
          color: "white",
          padding: "8px 14px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      {/* Display Event Image */}
      {event.image && (
        <img
          src={`http://localhost:5000${event.image}`}
          alt={event.title}
          style={{
            maxWidth: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        />
      )}

      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>

      {/* RSVP Button for User */}
      {user?.role === "user" && !hasRSVPed && (
        <button
          onClick={handleRSVP}
          disabled={rsvpLoading}
          style={{
            marginTop: "20px",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: rsvpLoading ? "not-allowed" : "pointer",
          }}
        >
          {rsvpLoading ? "RSVPing..." : "RSVP to this Event"}
        </button>
      )}

      {user?.role === "user" && hasRSVPed && (
        <p style={{ marginTop: "10px", color: "green" }}>
          You have already RSVPed.
        </p>
      )}

      {rsvpError && <p style={{ color: "red" }}>{rsvpError}</p>}

      {/* Admin Options */}
      {user?.role === "admin" && (
        <>
          <Link
            to={`/events/${id}/rsvps`}
            style={{
              marginTop: "20px",
              display: "inline-block",
              backgroundColor: "#10b981",
              color: "white",
              padding: "10px 16px",
              borderRadius: "4px",
              textDecoration: "none",
              marginRight: "10px",
            }}
          >
            View RSVP List
          </Link>

          <button
            onClick={handleDelete}
            style={{
              marginTop: "20px",
              backgroundColor: "#dc2626",
              color: "white",
              padding: "10px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete Event
          </button>
        </>
      )}
    </div>
  );
};

export default EventDetails;
