import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    _id: null,
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [formVisible, setFormVisible] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://event-management-mern-1owy.onrender.com/api/events");
      setEvents(res.data);
    } catch (error) {
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditClick = (event) => {
    setForm({
      _id: event._id,
      title: event.title,
      date: event.date.slice(0, 10),
      location: event.location,
      description: event.description,
    });
    setFormVisible(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`https://event-management-mern-1owy.onrender.com/api/events/${id}`);
        alert("Event deleted");
        fetchEvents();
      } catch (error) {
        alert("Failed to delete event");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        await axios.put(`https://event-management-mern-1owy.onrender.com/api/events/${form._id}`, form);
        alert("Event updated");
      } else {
        await axios.post("https://event-management-mern-1owy.onrender.comapi/events", form);
        alert("Event created");
      }
      resetForm();
      fetchEvents();
    } catch (error) {
      alert("Failed to save event");
    }
  };

  const resetForm = () => {
    setForm({ _id: null, title: "", date: "", location: "", description: "" });
    setFormVisible(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#E6E6FA",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        className="container my-5"
        style={{
          maxWidth: "1100px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 8px 20px rgba(123, 31, 162, 0.2)",
        }}
      >
        <h2 className="mb-5 text-primary fw-bold">🎯 Admin Panel - Manage Events</h2>

        <button
          className="btn btn-primary mb-5 shadow-sm"
          onClick={() => setFormVisible(true)}
          style={{ padding: "12px 28px", fontSize: "1.1rem" }}
        >
          + Create New Event
        </button>

        {formVisible && (
          <div className="card shadow-sm mb-5 p-4">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="form-control form-control-lg"
                />
              </div>

              <div className="mb-4">
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="form-control form-control-lg"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="form-control form-control-lg"
                />
              </div>

              <div className="mb-4">
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="form-control form-control-lg"
                />
              </div>

              <div className="d-flex gap-3">
                <button
                  type="submit"
                  className={`btn btn-lg ${form._id ? "btn-success" : "btn-primary"} shadow`}
                >
                  {form._id ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-outline-danger shadow"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <h3 className="mb-4">📋 Events List</h3>

        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>No events found</p>
        ) : (
          <div className="table-responsive shadow-sm rounded mb-5">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev._id}>
                    <td>{ev.title}</td>
                    <td>{new Date(ev.date).toLocaleDateString()}</td>
                    <td>{ev.location}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-info me-3 shadow-sm"
                        onClick={() => handleEditClick(ev)}
                        title="Edit Event"
                        style={{
                          backgroundColor: "rgba(59, 130, 246, 0.15)",
                          color: "#3b82f6",
                          borderColor: "#3b82f6",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "rgba(59, 130, 246, 0.3)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "rgba(59, 130, 246, 0.15)")
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger shadow-sm"
                        onClick={() => handleDeleteClick(ev._id)}
                        title="Delete Event"
                        style={{
                          backgroundColor: "rgba(239, 68, 68, 0.15)",
                          color: "#ef4444",
                          borderColor: "#ef4444",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "rgba(239, 68, 68, 0.3)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "rgba(239, 68, 68, 0.15)")
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
