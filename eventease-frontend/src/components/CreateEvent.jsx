import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData({
        ...eventData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("date", eventData.date);
    formData.append("location", eventData.location);
    formData.append("description", eventData.description);
    if (eventData.image) {
      formData.append("image", eventData.image);
    }

    try {
      await axios.post("http://localhost:5000/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Event created successfully!");
      navigate("/events");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #cbd5e1 0%, #e0e7ff 60%, #f3e8ff 100%)",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          padding: "30px 40px",
          boxShadow: "0 12px 30px rgba(123, 31, 162, 0.25)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#2563eb", // Blue color for title + plus sign
            marginBottom: "30px",
            fontWeight: "700",
            fontSize: "2rem",
            borderBottom: "3px solid #a78bfa",
            paddingBottom: "10px",
          }}
        >
          ➕ Create New Event
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="title"
              style={{
                fontWeight: "600",
                color: "#4b5563",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "0.95rem",
                borderRadius: "8px",
                border: "1.8px solid #c4b5fd",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#c4b5fd")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="date"
              style={{
                fontWeight: "600",
                color: "#4b5563",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "0.95rem",
                borderRadius: "8px",
                border: "1.8px solid #c4b5fd",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#c4b5fd")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="location"
              style={{
                fontWeight: "600",
                color: "#4b5563",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "0.95rem",
                borderRadius: "8px",
                border: "1.8px solid #c4b5fd",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#c4b5fd")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="description"
              style={{
                fontWeight: "600",
                color: "#4b5563",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "0.95rem",
                borderRadius: "8px",
                border: "1.8px solid #c4b5fd",
                outline: "none",
                transition: "border-color 0.3s ease",
                resize: "vertical",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#c4b5fd")}
            ></textarea>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label
              htmlFor="image"
              style={{
                fontWeight: "600",
                color: "#4b5563",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Event Image (optional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              style={{
                width: "100%",
                padding: "6px 12px",
                fontSize: "0.95rem",
                borderRadius: "8px",
                border: "1.8px solid #c4b5fd",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#c4b5fd")}
            />
            {eventData.imagePreview && (
              <div
                style={{
                  marginTop: "20px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1.5px solid #a78bfa",
                  maxHeight: "300px",
                  boxShadow: "0 6px 15px rgba(167, 139, 250, 0.25)",
                }}
              >
                <img
                  src={eventData.imagePreview}
                  alt="Event Preview"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "1.1rem",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 20px rgba(37, 99, 235, 0.5)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.backgroundColor = "#1e40af";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = "#2563eb";
            }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                  style={{ color: "#fff" }}
                ></span>
                Creating...
              </>
            ) : (
              "Create Event"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
