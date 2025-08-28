const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with better error handling
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit if database connection fails
  });

// Routes
app.use("/api/properties", require("./routes/propertyRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api", require("./routes/indexRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Check if build directory exists
const buildPath = path.join(__dirname, "client/build");
const indexPath = path.join(buildPath, "index.html");

// Serve static files from the React build directory (only if it exists)
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // Root route handler for API
  app.get("/api", (req, res) => {
    res.json({
      message: "Smart Rent System API",
      status: "running",
      timestamp: new Date().toISOString(),
      endpoints: {
        health: "/api/health",
        properties: "/api/properties",
        users: "/api/users",
        messages: "/api/messages",
        reviews: "/api/reviews",
        bookings: "/api/bookings",
      },
    });
  });

  // Catch-all handler: send back React's index.html file for any non-API routes
  app.get("*", (req, res) => {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("Error serving React app:", err);
        res.status(500).json({
          message: "Frontend not available",
          error: "React build files not found or corrupted",
        });
      }
    });
  });
} else {
  // If build directory doesn't exist, only serve API
  console.warn("React build directory not found. Only serving API endpoints.");

  // Root route handler for API
  app.get("/api", (req, res) => {
    res.json({
      message: "Smart Rent System API",
      status: "running",
      timestamp: new Date().toISOString(),
      endpoints: {
        health: "/api/health",
        properties: "/api/properties",
        users: "/api/users",
        messages: "/api/messages",
        reviews: "/api/reviews",
        bookings: "/api/bookings",
      },
    });
  });

  // Catch-all handler for non-API routes when build doesn't exist
  app.get("*", (req, res) => {
    res.status(404).json({
      message: "Frontend not available",
      error: "React build files not found. Please run 'npm run build' first.",
      availableEndpoints: {
        api: "/api",
        health: "/api/health",
        properties: "/api/properties",
        users: "/api/users",
      },
    });
  });
}

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
