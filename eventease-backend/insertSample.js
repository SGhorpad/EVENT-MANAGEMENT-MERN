const mongoose = require("mongoose");
const Event = require("./models/Event");

mongoose.connect("mongodb://127.0.0.1:27017/eventdb");

const events = [
  {
    title: "AI Hackathon 2025",
    date: new Date("2025-07-10"),
    location: "Pune",
    description: "24-hour hackathon on Artificial Intelligence",
  },
  {
    title: "Startup Expo",
    date: new Date("2025-08-01"),
    location: "Mumbai",
    description: "Showcase of innovative startups and ideas",
  },
  {
    title: "Tech Conference",
    date: new Date("2025-09-15"),
    location: "Bangalore",
    description: "Annual tech meetup for developers and startups",
  },
];

Event.insertMany(events)
  .then(() => {
    console.log("✅ Sample events inserted");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("❌ Error inserting events:", err);
  });
