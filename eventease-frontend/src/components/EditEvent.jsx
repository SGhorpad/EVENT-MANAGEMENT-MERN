import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: null, // file object
    imagePreview: "", // preview url
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://event-management-mern-1owy.onrender.com/api/events/${id}`);
        const event = res.data;
        setEventData({
          title: event.title,
          date: event.date?.substring(0, 10) || "",
          location: event.location,
          description: event.description,
          image: null,
          imagePreview: event.image ? `https://event-management-mern-1owy.onrender.com{event.image}` : "",
        });
      } catch (err) {
        console.error("Fetch event error", err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle image file select
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

    try {
      const formData = new FormData();
      formData.append("title", eventData.title);
      formData.append("date", eventData.date);
      formData.append("location", eventData.location);
      formData.append("description", eventData.description);

      // Append image file only if user selected a new one
      if (eventData.image) {
        formData.append("image", eventData.image);
      }

      await axios.put(`https://event-management-mern-1owy.onrender.com/api/events/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Event updated successfully!");
      navigate("/events");
    } catch (error) {
      console.error("❌ Update error:", error);
      alert("Error updating event.");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">✏️ Edit Event</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Event Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Event Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
          {eventData.imagePreview && (
            <img
              src={eventData.imagePreview}
              alt="Event Preview"
              className="mt-3 rounded"
              style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "cover" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
