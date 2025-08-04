/**
 * Script to create an admin user
 * Run with: node init/createAdmin.js
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/user');

// Load environment variables
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});

// Admin user data - customize as needed
const adminData = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'admin123', // This will be hashed before saving
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  phone: '1234567890'
};

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);
    
    // Create admin user
    const admin = await User.create({
      ...adminData,
      password: hashedPassword
    });

    console.log(`Admin user created: ${admin.email}`);
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

// Run the function
createAdmin(); 