const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dyem5b45p/image/upload/v1624917250/wanderlust/default-avatar_gjqyxn.png",
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "host", "admin"],
      default: "user",
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    referralCode: {
      type: String,
      unique: true,
    },
    referralPoints: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    resetPasswordExpire: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Generate referral code if not exists
  if (!this.referralCode) {
    this.referralCode = this._id.toString().slice(-6).toUpperCase();
  }

  next();
});

// Method to check if password matches
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Method to generate password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = Date.now() + 3600000; // 1 hour
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
