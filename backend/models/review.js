const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Comment is required']
    },
    cleanliness: {
      type: Number,
      min: 1,
      max: 5
    },
    accuracy: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    },
    location: {
      type: Number,
      min: 1,
      max: 5
    },
    checkIn: {
      type: Number,
      min: 1,
      max: 5
    },
    value: {
      type: Number,
      min: 1,
      max: 5
    },
    photos: [
      {
        url: String,
        publicId: String
      }
    ],
    isApproved: {
      type: Boolean,
      default: true
    },
    ownerResponse: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Prevent user from submitting more than one review per property
reviewSchema.index({ property: 1, user: 1 }, { unique: true });

// Static method to calculate average rating and update the property
reviewSchema.statics.calculateAverageRating = async function(propertyId) {
  const stats = await this.aggregate([
    {
      $match: { property: propertyId, isApproved: true }
    },
    {
      $group: {
        _id: '$property',
        avgRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Property').findByIdAndUpdate(propertyId, {
      averageRating: Math.round(stats[0].avgRating * 10) / 10, // Round to 1 decimal
      numReviews: stats[0].numReviews
    });
  } else {
    await mongoose.model('Property').findByIdAndUpdate(propertyId, {
      averageRating: 0,
      numReviews: 0
    });
  }
};

// Call calculateAverageRating after save
reviewSchema.post('save', function() {
  this.constructor.calculateAverageRating(this.property);
});

// Call calculateAverageRating after delete
reviewSchema.post('remove', function() {
  this.constructor.calculateAverageRating(this.property);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; 