const Review = require('../models/review');
const Property = require('../models/property');
const Booking = require('../models/booking');
const User = require('../models/user');
const { reviewSchema } = require('../schema');

// @desc    Create a new review
// @route   POST /api/properties/:propertyId/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = reviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const propertyId = req.params.propertyId;
    
    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check if user has booked the property before
    const booking = await Booking.findOne({
      property: propertyId,
      user: req.user._id,
      status: 'completed'
    });
    
    if (!booking) {
      return res.status(400).json({ message: 'You can only review properties you have stayed at' });
    }
    
    // Check if user has already reviewed this property
    const existingReview = await Review.findOne({
      property: propertyId,
      user: req.user._id
    });
    
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this property' });
    }
    
    // Create review
    const review = new Review({
      property: propertyId,
      user: req.user._id,
      booking: booking._id,
      rating: value.rating,
      comment: value.comment,
      cleanliness: value.cleanliness,
      accuracy: value.accuracy,
      communication: value.communication,
      location: value.location,
      checkIn: value.checkIn,
      value: value.value
    });
    
    // Save review
    const savedReview = await review.save();
    
    // Add review to property's reviews
    property.reviews.push(savedReview._id);
    await property.save();
    
    // Add review to user's reviews
    await User.findByIdAndUpdate(req.user._id, {
      $push: { reviews: savedReview._id }
    });
    
    // Mark booking as reviewed
    booking.reviewSubmitted = true;
    await booking.save();
    
    // Populate user data before sending response
    const populatedReview = await Review.findById(savedReview._id).populate({
      path: 'user',
      select: 'username firstName lastName profileImage'
    });
    
    res.status(201).json(populatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all reviews for a property
// @route   GET /api/properties/:propertyId/reviews
// @access  Public
const getPropertyReviews = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    
    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Find reviews for the property
    const reviews = await Review.find({ 
      property: propertyId,
      isApproved: true 
    })
      .populate({
        path: 'user',
        select: 'username firstName lastName profileImage'
      })
      .sort({ createdAt: -1 });
    
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a review by ID
// @route   GET /api/reviews/:id
// @access  Public
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'username firstName lastName profileImage'
      })
      .populate({
        path: 'property',
        select: 'title location images'
      });
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    // Find review
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Check ownership
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }
    
    // Validate request data
    const { error, value } = reviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    // Update review
    Object.keys(value).forEach(key => {
      review[key] = value[key];
    });
    
    await review.save();
    
    // Populate user data before sending response
    const updatedReview = await Review.findById(review._id).populate({
      path: 'user',
      select: 'username firstName lastName profileImage'
    });
    
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    // Find review
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Check ownership
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }
    
    // Remove review from property's reviews
    await Property.findByIdAndUpdate(review.property, {
      $pull: { reviews: review._id }
    });
    
    // Remove review from user's reviews
    await User.findByIdAndUpdate(review.user, {
      $pull: { reviews: review._id }
    });
    
    // Delete review
    await review.remove();
    
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add owner response to a review
// @route   PUT /api/reviews/:id/response
// @access  Private (Property Owner/Admin)
const addOwnerResponse = async (req, res) => {
  try {
    // Find review
    const review = await Review.findById(req.params.id).populate('property');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Check if user is the property owner or admin
    if (review.property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only the property owner can respond to reviews' });
    }
    
    // Check if response exists
    if (!req.body.response) {
      return res.status(400).json({ message: 'Response is required' });
    }
    
    // Add response
    review.ownerResponse = req.body.response;
    await review.save();
    
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Approve a review (Admin only)
// @route   PUT /api/reviews/:id/approve
// @access  Private (Admin)
const approveReview = async (req, res) => {
  try {
    // Find review
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Update review approval status
    review.isApproved = true;
    await review.save();
    
    res.status(200).json({
      message: 'Review approved successfully',
      review
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createReview,
  getPropertyReviews,
  getReviewById,
  updateReview,
  deleteReview,
  addOwnerResponse,
  approveReview
}; 