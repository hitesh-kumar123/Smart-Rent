const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

/**
 * @route   GET /api
 * @desc    API information
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    name: 'Smart Rent System API',
    version: '1.0.0',
    description: 'API for managing property rentals',
    documentation: '/api-docs'
  });
});

module.exports = router; 