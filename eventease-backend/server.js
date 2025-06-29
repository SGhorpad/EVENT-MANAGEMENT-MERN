require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));  // <--- Important: use cors with options here
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const io = new Server(server, {
  cors: corsOptions,  // <--- Same cors options for socket.io
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const adminRoutes = require('./routes/admin');
const rsvpRoutes = require("./routes/rsvp");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/rsvp", rsvpRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Atlas connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
