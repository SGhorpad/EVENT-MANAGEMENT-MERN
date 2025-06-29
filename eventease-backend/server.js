require('dotenv').config(); //  Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

//  Setup Socket.IO with frontend origin from .env
const io = new Server(server, {
  cors: {
    origin:https://event-management-mern-frontend.onrender.com || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//  Handle WebSocket connections
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

//  Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//  Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const adminRoutes = require('./routes/admin');
const rsvpRoutes = require("./routes/rsvp");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/rsvp", rsvpRoutes);

//  Connect to MongoDB Atlas using MONGO_URL from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Atlas connected"))
.catch((err) => console.error(" MongoDB connection error:", err));

//  Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
