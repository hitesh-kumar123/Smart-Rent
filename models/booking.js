const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
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
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required']
    },
    checkOut: {
      type: Date,
      required: [true, 'Check-out date is required']
    },
    numNights: {
      type: Number,
      required: true
    },
    numGuests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: 1
    },
    totalPrice: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'refunded', 'failed'],
      default: 'pending'
    },
    paymentInfo: {
      id: String,
      status: String,
      method: String,
      tax: Number
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled', 'completed'],
      default: 'pending'
    },
    message: {
      type: String
    },
    invoiceId: {
      type: String
    },
    reviewSubmitted: {
      type: Boolean,
      default: false
    },
    canceledBy: {
      type: String,
      enum: ['guest', 'host', 'admin', null],
      default: null
    },
    refundAmount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Pre-save middleware to calculate number of nights
bookingSchema.pre('save', function(next) {
  if (this.isModified('checkIn') || this.isModified('checkOut')) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const checkIn = new Date(this.checkIn);
    const checkOut = new Date(this.checkOut);
    
    // Calculate number of nights
    this.numNights = Math.round(Math.abs((checkOut - checkIn) / oneDay));
  }
  
  next();
});

// Virtual for invoice URL (if needed)
bookingSchema.virtual('invoiceUrl').get(function() {
  return this.invoiceId ? `/api/bookings/${this._id}/invoice` : null;
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 