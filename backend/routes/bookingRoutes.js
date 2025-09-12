const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticate, authorize } = require('../middleware');

// Protected routes
router.post('/', authenticate, bookingController.createBooking);
router.get('/', authenticate, bookingController.getBookings);
router.get('/:id', authenticate, bookingController.getBookingById);
router.put('/:id/cancel', authenticate, bookingController.cancelBooking);
router.put('/:id/pay', authenticate, bookingController.completePayment);
router.get('/:id/invoice', authenticate, bookingController.generateInvoice);

module.exports = router; 