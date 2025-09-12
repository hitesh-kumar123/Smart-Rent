const User = require("../models/user");
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
  passwordSchema,
  passwordResetRequestSchema,
  resetPasswordSchema,
} = require("../schema");
const { cloudinary } = require("../cloudConfig");
const crypto = require("crypto");
const { sendPasswordResetEmail } = require("../services/emailService");

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
      referralCode,
    } = value;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
    });

    // If referral code exists, add points to referrer
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        referrer.referralPoints += 100; // Give 100 points to referrer
        await referrer.save();
      }
    }

    // Generate token
    const token = user.generateToken();

    // Send response
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      profileImage: user.profileImage,
      referralCode: user.referralCode,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = value;

    // Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = user.generateToken();

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Send response
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      profileImage: user.profileImage,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = async (req, res) => {
  try {
    // Clear cookie
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate({
        path: "bookings",
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "properties",
        options: { sort: { createdAt: -1 } },
      })
      .populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if username or email already exists
    if (value.username || value.email) {
      const existingUser = await User.findOne({
        $or: [
          { username: value.username, _id: { $ne: req.user._id } },
          { email: value.email, _id: { $ne: req.user._id } },
        ],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }
    }

    // Update user
    const user = await User.findByIdAndUpdate(req.user._id, value, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
const updatePassword = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = passwordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { currentPassword, newPassword } = value;

    // Get user with password
    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Upload profile image
// @route   POST /api/users/profile/image
// @access  Private
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Find user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete previous profile image if it exists
    if (user.profileImage && user.profileImage.includes("cloudinary")) {
      const publicId = user.profileImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`wanderlust/${publicId}`);
    }

    // Update user with new profile image
    user.profileImage = req.file.path;
    await user.save();

    res.status(200).json({
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete profile image
// @route   DELETE /api/users/profile/image
// @access  Private
const deleteProfileImage = async (req, res) => {
  try {
    // Find user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete profile image from Cloudinary if it exists
    if (user.profileImage && user.profileImage.includes("cloudinary")) {
      const publicId = user.profileImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`wanderlust/${publicId}`);
    }

    // Reset to default avatar
    user.profileImage =
      "https://res.cloudinary.com/dyem5b45p/image/upload/v1624917250/wanderlust/default-avatar_gjqyxn.png";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image removed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add property to wishlist
// @route   POST /api/users/wishlist/:propertyId
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check if property exists in user's wishlist
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.wishlist.includes(propertyId)) {
      return res.status(400).json({ message: "Property already in wishlist" });
    }

    // Add property to wishlist
    user.wishlist.push(propertyId);
    await user.save();

    res
      .status(200)
      .json({ message: "Property added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Remove property from wishlist
// @route   DELETE /api/users/wishlist/:propertyId
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Remove property from wishlist
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== propertyId);
    await user.save();

    res.status(200).json({
      message: "Property removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Request password reset
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    console.log("Forgot password request received:", req.body);

    // Validate request data
    const { error, value } = passwordResetRequestSchema.validate(req.body);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email } = value;
    console.log(`Looking for user with email: ${email}`);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found with email: ${email}`);
      // Don't reveal if user exists for security
      return res.status(200).json({
        message:
          "If a user with this email exists, they will receive a password reset email",
      });
    }

    console.log(`User found: ${user._id}`);

    try {
      // Generate reset token using the model method
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      // Send email
      console.log("Attempting to send reset email");
      await sendPasswordResetEmail(email, resetToken);
      console.log("Reset email sent successfully");

      res.status(200).json({
        message:
          "If a user with this email exists, they will receive a password reset email",
      });
    } catch (emailError) {
      // If email sending fails, clean up the token
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      console.error("Error sending reset email:", emailError);
      throw new Error("Failed to send password reset email");
    }
  } catch (error) {
    console.error("Error in forgotPassword controller:", error);
    res.status(500).json({
      message: "Error processing password reset request",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Reset password
// @route   POST /api/users/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = resetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { token } = req.params;
    const { password } = value;

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  uploadProfileImage,
  deleteProfileImage,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  forgotPassword,
  resetPassword,
};
