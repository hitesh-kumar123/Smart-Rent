const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property'
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    lastMessage: {
      content: String,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      createdAt: Date
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {}
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Ensure unique conversation between two users regarding a specific property
conversationSchema.index(
  { participants: 1, property: 1 },
  { unique: true, partialFilterExpression: { property: { $exists: true } } }
);

// Virtual for generating conversation title based on participants
conversationSchema.virtual('title').get(function() {
  return `Conversation #${this._id.toString().slice(-4).toUpperCase()}`;
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation; 