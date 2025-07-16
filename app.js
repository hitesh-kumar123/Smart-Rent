const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS with specific options
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your React app's origin
    credentials: true, // Allow credentials
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/smart_rent_system";
    console.log("Attempting to connect to MongoDB at:", mongoURI);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected Successfully");

    // Test the connection by getting connection state
    const connectionState = mongoose.connection.readyState;
    console.log(
      "Connection State:",
      connectionState === 0
        ? "disconnected"
        : connectionState === 1
          ? "connected"
          : connectionState === 2
            ? "connecting"
            : connectionState === 3
              ? "disconnecting"
              : "unknown"
    );
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/api/properties", require("./routes/propertyRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api", require("./routes/indexRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
