const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Apartment",
        "House",
        "Villa",
        "Condo",
        "Cabin",
        "Cottage",
        "Farmhouse",
        "Other",
      ],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
      zipCode: {
        type: String,
        required: [true, "Zip code is required"],
      },
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    amenities: {
      wifi: { type: Boolean, default: false },
      kitchen: { type: Boolean, default: false },
      ac: { type: Boolean, default: false },
      heating: { type: Boolean, default: false },
      tv: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      pool: { type: Boolean, default: false },
      washer: { type: Boolean, default: false },
      dryer: { type: Boolean, default: false },
      gym: { type: Boolean, default: false },
      hotTub: { type: Boolean, default: false },
      breakfast: { type: Boolean, default: false },
      workspace: { type: Boolean, default: false },
      petFriendly: { type: Boolean, default: false },
    },
    capacity: {
      guests: {
        type: Number,
        required: [true, "Number of guests is required"],
        min: 1,
      },
      bedrooms: {
        type: Number,
        required: [true, "Number of bedrooms is required"],
        min: 1,
      },
      beds: {
        type: Number,
        required: [true, "Number of beds is required"],
        min: 1,
      },
      bathrooms: {
        type: Number,
        required: [true, "Number of bathrooms is required"],
        min: 1,
      },
    },
    rules: {
      smoking: { type: Boolean, default: false },
      pets: { type: Boolean, default: false },
      parties: { type: Boolean, default: false },
      checkInTime: { type: String, default: "14:00" },
      checkOutTime: { type: String, default: "11:00" },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    availability: [
      {
        date: Date,
        isBooked: { type: Boolean, default: false },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add index for location-based searches
propertySchema.index({ "location.coordinates": "2dsphere" });

// Virtual for calculating availability
propertySchema.virtual("isAvailable").get(function () {
  return this.isActive && this.isApproved;
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
