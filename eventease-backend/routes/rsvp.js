const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/auth");

// GET all events RSVP'd by the logged-in user
router.get("/myrsvps", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const events = await Event.find({ rsvps: userId }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching user's RSVP events:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/rsvp/:eventId — cancel RSVP to an event
router.delete("/:eventId", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.rsvps = event.rsvps.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );
    await event.save();

    res.json({ message: "RSVP cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
