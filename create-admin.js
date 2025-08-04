const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");
const connectDB = require("./init/database");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create admin user
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@example.com" });

    if (adminExists) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Create new admin user
    const admin = new User({
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      isVerified: true,
    });

    await admin.save();
    console.log("Admin user created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

// Run the script
createAdmin();
