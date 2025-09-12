const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate, authorize } = require('../middleware');

// Public routes
router.get('/:id', reviewController.getReviewById);

// Protected routes
router.put('/:id', authenticate, reviewController.updateReview);
router.delete('/:id', authenticate, reviewController.deleteReview);
router.put('/:id/response', authenticate, reviewController.addOwnerResponse);

// Admin only routes
router.put('/:id/approve', authenticate, authorize('admin'), reviewController.approveReview);

module.exports = router; 