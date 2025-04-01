const Message = require('../models/message');
const Conversation = require('../models/conversation');
const User = require('../models/user');
const Property = require('../models/property');
const { messageSchema } = require('../schema');

// @desc    Create a new conversation
// @route   POST /api/conversations
// @access  Private
const createConversation = async (req, res) => {
  try {
    // Validate request data
    if (!req.body.receiverId) {
      return res.status(400).json({ message: 'Receiver ID is required' });
    }

    const receiverId = req.body.receiverId;
    const propertyId = req.body.propertyId;
    
    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }
    
    // Check if property exists if provided
    if (propertyId) {
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
    }
    
    // Check if conversation already exists
    let conversation;
    
    if (propertyId) {
      // Find conversation between these users regarding this property
      conversation = await Conversation.findOne({
        participants: { $all: [req.user._id, receiverId] },
        property: propertyId
      });
    } else {
      // Find general conversation between these users
      conversation = await Conversation.findOne({
        participants: { $all: [req.user._id, receiverId] },
        property: { $exists: false }
      });
    }
    
    // If conversation doesn't exist, create a new one
    if (!conversation) {
      const newConversation = new Conversation({
        participants: [req.user._id, receiverId],
        property: propertyId,
        unreadCounts: {
          [req.user._id]: 0,
          [receiverId]: 0
        }
      });
      
      conversation = await newConversation.save();
    }
    
    // Populate participants info
    const populatedConversation = await Conversation.findById(conversation._id)
      .populate({
        path: 'participants',
        select: 'username firstName lastName profileImage'
      })
      .populate({
        path: 'property',
        select: 'title images location'
      });
    
    res.status(201).json(populatedConversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all conversations for a user
// @route   GET /api/conversations
// @access  Private
const getConversations = async (req, res) => {
  try {
    // Find all conversations for the user
    const conversations = await Conversation.find({
      participants: req.user._id,
      isActive: true
    })
      .populate({
        path: 'participants',
        select: 'username firstName lastName profileImage'
      })
      .populate({
        path: 'property',
        select: 'title images location'
      })
      .populate({
        path: 'booking',
        select: 'checkIn checkOut status'
      })
      .sort({ updatedAt: -1 });
    
    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a conversation by ID
// @route   GET /api/conversations/:id
// @access  Private
const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate({
        path: 'participants',
        select: 'username firstName lastName profileImage'
      })
      .populate({
        path: 'property',
        select: 'title images location'
      })
      .populate({
        path: 'booking',
        select: 'checkIn checkOut status'
      });
    
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    // Check if user is a participant in the conversation
    if (!conversation.participants.some(p => p._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Not authorized to view this conversation' });
    }
    
    // Mark messages as read
    conversation.unreadCounts.set(req.user._id.toString(), 0);
    await conversation.save();
    
    // Get all messages for the conversation
    const messages = await Message.find({ conversation: conversation._id })
      .populate({
        path: 'sender',
        select: 'username firstName lastName profileImage'
      })
      .sort({ createdAt: 1 });
    
    // Mark all messages from other participants as read
    await Message.updateMany(
      { 
        conversation: conversation._id,
        sender: { $ne: req.user._id },
        read: false
      },
      { read: true }
    );
    
    res.status(200).json({
      conversation,
      messages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = messageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const { conversation: conversationId, content, receiver: receiverId } = value;
    
    // Check if conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    // Check if user is a participant in the conversation
    if (!conversation.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to send messages in this conversation' });
    }
    
    // Check if receiver is a participant in the conversation
    if (!conversation.participants.includes(receiverId)) {
      return res.status(403).json({ message: 'Receiver is not part of this conversation' });
    }
    
    // Create new message
    const message = new Message({
      conversation: conversationId,
      sender: req.user._id,
      receiver: receiverId,
      content
    });
    
    // If attachments are provided, add them
    if (req.files && req.files.length > 0) {
      message.attachments = req.files.map(file => ({
        url: file.path,
        publicId: file.filename,
        type: file.mimetype.split('/')[0]
      }));
    }
    
    // Save message
    const savedMessage = await message.save();
    
    // Update conversation's last message
    conversation.lastMessage = {
      content: content.length > 30 ? `${content.substring(0, 30)}...` : content,
      sender: req.user._id,
      createdAt: new Date()
    };
    
    // Increment unread count for receiver
    const currentUnreadCount = conversation.unreadCounts.get(receiverId.toString()) || 0;
    conversation.unreadCounts.set(receiverId.toString(), currentUnreadCount + 1);
    
    await conversation.save();
    
    // Populate sender info before sending response
    const populatedMessage = await Message.findById(savedMessage._id).populate({
      path: 'sender',
      select: 'username firstName lastName profileImage'
    });
    
    // Emit socket event here if using Socket.io
    // if (req.io) {
    //   req.io.to(receiverId.toString()).emit('newMessage', populatedMessage);
    // }
    
    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all messages for a conversation
// @route   GET /api/conversations/:id/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const conversationId = req.params.id;
    
    // Check if conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    // Check if user is a participant in the conversation
    if (!conversation.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to view messages in this conversation' });
    }
    
    // Get messages with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const messages = await Message.find({ conversation: conversationId })
      .populate({
        path: 'sender',
        select: 'username firstName lastName profileImage'
      })
      .sort({ createdAt: -1 }) // Most recent first
      .skip(skip)
      .limit(limit);
    
    // Count total messages
    const total = await Message.countDocuments({ conversation: conversationId });
    
    // Mark messages as read
    await Message.updateMany(
      { 
        conversation: conversationId,
        sender: { $ne: req.user._id },
        read: false
      },
      { read: true }
    );
    
    // Reset unread count for the user
    conversation.unreadCounts.set(req.user._id.toString(), 0);
    await conversation.save();
    
    // Send response with pagination
    res.status(200).json({
      messages: messages.reverse(), // Reverse to get oldest first
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a conversation
// @route   DELETE /api/conversations/:id
// @access  Private
const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    // Check if user is a participant in the conversation
    if (!conversation.participants.includes(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this conversation' });
    }
    
    // Soft delete by marking as inactive
    conversation.isActive = false;
    await conversation.save();
    
    res.status(200).json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // Check if user is the sender of the message or admin
    if (message.sender.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }
    
    // Delete message
    await message.remove();
    
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversationById,
  sendMessage,
  getMessages,
  deleteConversation,
  deleteMessage
}; 