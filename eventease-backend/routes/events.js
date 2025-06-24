const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/auth"); // Protect route, get user info from token
const multer = require("multer");
const path = require("path");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");  // Folder to save images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching single event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE event by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create new event with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, date, location } = req.body;
    const eventData = { title, date, location };

    if (req.file) {
      // Save relative path to DB
      eventData.image = "/uploads/" + req.file.filename;
    }

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update event by ID with optional image upload
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = "/uploads/" + req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST RSVP to event
router.post("/:id/rsvp", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.rsvps.includes(req.user._id)) {
      return res.status(400).json({ message: "You have already RSVPed" });
    }

    event.rsvps.push(req.user._id);
    await event.save();

    const populatedEvent = await Event.findById(req.params.id).populate("rsvps", "username email");

    res.json(populatedEvent);
  } catch (error) {
    console.error("RSVP error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET RSVP list for event (admin only)
router.get("/:id/rsvps", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const event = await Event.findById(req.params.id).populate("rsvps", "username email");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ rsvps: event.rsvps });
  } catch (error) {
    console.error("Error fetching RSVP list:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
