const Property = require("../models/property");
const User = require("../models/user");
const { propertySchema } = require("../schema");
const { cloudinary } = require("../cloudConfig");

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private (Host/Admin)
const createProperty = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = propertySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Create property
    const property = new Property({
      ...value,
      owner: req.user._id,
    });

    // Save property
    const savedProperty = await property.save();

    // Add property to user's properties
    await User.findByIdAndUpdate(req.user._id, {
      $push: { properties: savedProperty._id },
    });

    res.status(201).json(savedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    // Build filter - explicitly include all properties by setting $or condition for isActive and isApproved
    const filter = {
      $or: [
        { isActive: true },
        { isActive: false },
        { isActive: { $exists: false } },
        { isApproved: true },
        { isApproved: false },
        { isApproved: { $exists: false } },
      ],
    };

    // Add location search if provided
    if (req.query.location) {
      filter["location.city"] = { $regex: req.query.location, $options: "i" };
    }

    // Add category filter if provided
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Add price range if provided
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }

    // Add capacity filter if provided
    if (req.query.guests) {
      filter["capacity.guests"] = { $gte: Number(req.query.guests) };
    }

    // Add amenities filter if provided
    if (req.query.amenities) {
      const amenities = req.query.amenities.split(",");
      amenities.forEach((amenity) => {
        filter[`amenities.${amenity}`] = true;
      });
    }

    // Set up pagination - if limit is not provided, show all properties
    const page = parseInt(req.query.page) || 1;
    // Use a very high limit to show all properties if no limit is provided, or use the provided limit
    const limit =
      req.query.limit === undefined ? 1000 : parseInt(req.query.limit) || 1000;
    const startIndex = (page - 1) * limit;

    // Count total properties for pagination
    const total = await Property.countDocuments({});
    console.log(`Total properties in database: ${total}`);

    const filteredTotal = await Property.countDocuments(filter);
    console.log(`Total properties matching filters: ${filteredTotal}`);
    console.log(`Filter criteria: ${JSON.stringify(filter)}`);

    // Find properties with all fields including images
    let properties = await Property.find(filter)
      .populate("owner", "username firstName lastName profileImage")
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean();

    console.log(`Properties fetched: ${properties.length}`);

    // Log how many images each property has
    properties.forEach((property, index) => {
      console.log(
        `Property ${index} - Title: ${property.title}, Images: ${
          property.images ? property.images.length : 0
        }`
      );
    });

    // Set up pagination result
    const pagination = {
      page,
      limit,
      total: properties.length,
      pages: Math.ceil(properties.length / limit),
    };

    res.status(200).json({ properties, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get a property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "username firstName lastName profileImage")
      .populate({
        path: "reviews",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "user",
          select: "username firstName lastName profileImage",
        },
      });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private (Owner/Admin)
const updateProperty = async (req, res) => {
  try {
    // Find property
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check ownership
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this property" });
    }

    // Validate request data
    const { error, value } = propertySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Update property
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private (Owner/Admin)
const deleteProperty = async (req, res) => {
  try {
    // Find property
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check ownership
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this property" });
    }

    // Delete property images from cloudinary
    for (const image of property.images) {
      if (image.publicId) {
        await cloudinary.uploader.destroy(image.publicId);
      }
    }

    // Remove property from user's properties
    await User.findByIdAndUpdate(property.owner, {
      $pull: { properties: property._id },
    });

    // Delete property
    await property.remove();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Upload property images
// @route   POST /api/properties/:id/images
// @access  Private (Owner/Admin)
const uploadPropertyImages = async (req, res) => {
  try {
    // Find property
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check ownership
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this property" });
    }

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Add images to property
    const newImages = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    property.images.push(...newImages);
    await property.save();

    res.status(200).json({
      message: "Images uploaded successfully",
      images: property.images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete property image
// @route   DELETE /api/properties/:id/images/:imageId
// @access  Private (Owner/Admin)
const deletePropertyImage = async (req, res) => {
  try {
    // Find property
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check ownership
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this property" });
    }

    // Find image in property
    const image = property.images.id(req.params.imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete image from cloudinary
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    // Remove image from property
    property.images.pull(req.params.imageId);
    await property.save();

    res.status(200).json({
      message: "Image deleted successfully",
      images: property.images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update property availability
// @route   PUT /api/properties/:id/availability
// @access  Private (Owner/Admin)
const updateAvailability = async (req, res) => {
  try {
    // Find property
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check ownership
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this property" });
    }

    // Validate request data
    if (!req.body.availability || !Array.isArray(req.body.availability)) {
      return res.status(400).json({ message: "Invalid availability data" });
    }

    // Update property availability
    property.availability = req.body.availability;
    await property.save();

    res.status(200).json({
      message: "Availability updated successfully",
      availability: property.availability,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get my properties
// @route   GET /api/properties/user/me
// @access  Private
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Approve a property (Admin only)
// @route   PUT /api/properties/:id/approve
// @access  Private (Admin)
const approveProperty = async (req, res) => {
  try {
    // Find property
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Update property
    property.isApproved = true;
    await property.save();

    res.status(200).json({
      message: "Property approved successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  uploadPropertyImages,
  deletePropertyImage,
  updateAvailability,
  getMyProperties,
  approveProperty,
};
