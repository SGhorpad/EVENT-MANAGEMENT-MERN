const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },        // Add this line
  rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Add a compound unique index on title + date  ..avoid duplication 
eventSchema.index({ title: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Event", eventSchema);
