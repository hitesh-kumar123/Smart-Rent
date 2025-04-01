const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const http = require("http");
const socketio = require("socket.io");
const connectDB = require("./init/database");

// Load env vars
dotenv.config();

// Connect to database
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/smart_rent_system";
console.log(`Connecting to MongoDB: ${MONGODB_URI}`);
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // Join a room based on user ID
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Listen for new messages
  socket.on("sendMessage", (message) => {
    // Send message to recipient's room
    io.to(message.receiver).emit("newMessage", message);
  });

  // Handle typing events
  socket.on("typing", (data) => {
    socket.to(data.receiver).emit("typing", data);
  });

  // Handle stop typing events
  socket.on("stopTyping", (data) => {
    socket.to(data.receiver).emit("stopTyping", data);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(mongoSanitize());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: "*", // Allow all origins temporarily for testing
    credentials: true,
  })
);

// Custom middleware
const { sanitizeData } = require("./middleware/validationMiddleware");
app.use(sanitizeData);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api", require("./routes/indexRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api", require("./routes/messageRoutes"));

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Error handlers
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
