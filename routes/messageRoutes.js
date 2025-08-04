const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authenticate } = require('../middleware');
const { upload } = require('../cloudConfig');

// Conversation routes
router.post('/conversations', authenticate, messageController.createConversation);
router.get('/conversations', authenticate, messageController.getConversations);
router.get('/conversations/:id', authenticate, messageController.getConversationById);
router.get('/conversations/:id/messages', authenticate, messageController.getMessages);
router.delete('/conversations/:id', authenticate, messageController.deleteConversation);

// Message routes
router.post('/messages', authenticate, upload.array('attachments', 5), messageController.sendMessage);
router.delete('/messages/:id', authenticate, messageController.deleteMessage);

module.exports = router; 