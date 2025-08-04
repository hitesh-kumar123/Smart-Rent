const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const reviewController = require("../controllers/reviewController");
const { authenticate, authorize } = require("../middleware");
const { upload } = require("../cloudConfig");

// Test route to check data structure
router.get("/test", async (req, res) => {
  try {
    const Property = require("../models/property");
    const properties = await Property.find().limit(2);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New route to get all properties without any filtering
router.get("/all", async (req, res) => {
  try {
    const Property = require("../models/property");
    const properties = await Property.find({})
      .populate("owner", "username firstName lastName profileImage")
      .sort({ createdAt: -1 });

    console.log(`Found ${properties.length} properties with no filtering`);
    res.json(properties);
  } catch (error) {
    console.error("Error getting all properties:", error);
    res.status(500).json({ error: error.message });
  }
});

// Public routes
router.get("/", propertyController.getProperties);
router.get("/:id", propertyController.getPropertyById);
router.get("/:propertyId/reviews", reviewController.getPropertyReviews);

// Protected routes - Host/Admin only
router.post(
  "/",
  authenticate,
  authorize("host", "admin"),
  propertyController.createProperty
);
router.put("/:id", authenticate, propertyController.updateProperty); // Authorization checked in controller
router.delete("/:id", authenticate, propertyController.deleteProperty); // Authorization checked in controller

// Property images
router.post(
  "/:id/images",
  authenticate,
  upload.array("images", 10),
  propertyController.uploadPropertyImages
);
router.delete(
  "/:id/images/:imageId",
  authenticate,
  propertyController.deletePropertyImage
);

// Availability management
router.put(
  "/:id/availability",
  authenticate,
  propertyController.updateAvailability
);

// User's properties
router.get("/user/me", authenticate, propertyController.getMyProperties);

// Reviews
router.post(
  "/:propertyId/reviews",
  authenticate,
  reviewController.createReview
);

// Admin only routes
router.put(
  "/:id/approve",
  authenticate,
  authorize("admin"),
  propertyController.approveProperty
);

module.exports = router;
