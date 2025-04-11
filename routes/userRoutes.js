const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware");
const { upload } = require("../cloudConfig");

// Public routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

// Protected routes
router.post("/logout", authenticate, userController.logoutUser);
router.get("/profile", authenticate, userController.getUserProfile);
router.put("/profile", authenticate, userController.updateUserProfile);
router.put("/password", authenticate, userController.updatePassword);
router.post(
  "/profile/image",
  authenticate,
  upload.single("profileImage"),
  userController.uploadProfileImage
);
router.delete(
  "/profile/image",
  authenticate,
  userController.deleteProfileImage
);

// Wishlist routes
router.get("/wishlist", authenticate, userController.getWishlist);
router.post(
  "/wishlist/:propertyId",
  authenticate,
  userController.addToWishlist
);
router.delete(
  "/wishlist/:propertyId",
  authenticate,
  userController.removeFromWishlist
);

module.exports = router;
