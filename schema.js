const Joi = require("joi");

// User validation schema
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().allow(""),
  referralCode: Joi.string().allow(""),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string().allow(""),
  bio: Joi.string().allow(""),
  location: Joi.string().allow(""),
});

const passwordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({ "any.only": "Confirm password must match new password" }),
});

const passwordResetRequestSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Confirm password must match password" }),
});

// Property validation schema
const propertySchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string()
    .valid(
      "Apartment",
      "House",
      "Villa",
      "Condo",
      "Cabin",
      "Cottage",
      "Farmhouse",
      "Other"
    )
    .required(),
  price: Joi.number().min(1).required(),
  location: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zipCode: Joi.string().required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  }).required(),
  amenities: Joi.object({
    wifi: Joi.boolean(),
    kitchen: Joi.boolean(),
    ac: Joi.boolean(),
    heating: Joi.boolean(),
    tv: Joi.boolean(),
    parking: Joi.boolean(),
    pool: Joi.boolean(),
    washer: Joi.boolean(),
    dryer: Joi.boolean(),
    gym: Joi.boolean(),
    hotTub: Joi.boolean(),
    breakfast: Joi.boolean(),
    workspace: Joi.boolean(),
    petFriendly: Joi.boolean(),
  }),
  capacity: Joi.object({
    guests: Joi.number().min(1).required(),
    bedrooms: Joi.number().min(1).required(),
    beds: Joi.number().min(1).required(),
    bathrooms: Joi.number().min(1).required(),
  }).required(),
  rules: Joi.object({
    smoking: Joi.boolean(),
    pets: Joi.boolean(),
    parties: Joi.boolean(),
    checkInTime: Joi.string(),
    checkOutTime: Joi.string(),
  }),
});

// Booking validation schema
const bookingSchema = Joi.object({
  property: Joi.string().required(),
  checkIn: Joi.date().greater("now").required(),
  checkOut: Joi.date().greater(Joi.ref("checkIn")).required(),
  numGuests: Joi.number().min(1).required(),
  message: Joi.string().allow(""),
});

// Review validation schema
const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(3).required(),
  cleanliness: Joi.number().min(1).max(5),
  accuracy: Joi.number().min(1).max(5),
  communication: Joi.number().min(1).max(5),
  location: Joi.number().min(1).max(5),
  checkIn: Joi.number().min(1).max(5),
  value: Joi.number().min(1).max(5),
});

// Message validation schema
const messageSchema = Joi.object({
  content: Joi.string().required().max(1000),
  receiver: Joi.string().required(),
  conversation: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  passwordSchema,
  passwordResetRequestSchema,
  resetPasswordSchema,
  propertySchema,
  bookingSchema,
  reviewSchema,
  messageSchema,
};
