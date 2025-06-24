import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const defaultImage = "https://via.placeholder.com/400x300?text=No+Image";



const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://event-management-mern-1owy.onrender.com/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center fw-bold text-primary">🎉 All Events</h1>

      {user?.role === "admin" && (
        <div className="text-end mb-3">
          <Link to="/create" className="btn btn-success">
            + Create New Event
          </Link>
        </div>
      )}

      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-muted">No events available right now.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {events.map((event) => (
            <div className="col" key={event._id}>
              <div className="card h-100 shadow rounded-4 border-0">
                <img
                  src={
                    event.image
                      ? `https://event-management-mern-1owy.onrender.com${event.image}`
                      : defaultImage
                  }
                  alt={event.title}
                  className="card-img-top rounded-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{event.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Location:</strong> {event.location}
                  </p>

                  <div className="mt-auto d-flex gap-2">
                    <button
                      onClick={() =>
                        (window.location.href = `/events/${event._id}`)
                      }
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </button>

                    {user?.role === "admin" && (
                      <button
                        onClick={() => navigate(`/edit/${event._id}`)}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
