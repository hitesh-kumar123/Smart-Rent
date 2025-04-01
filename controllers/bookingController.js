const Booking = require('../models/booking');
const Property = require('../models/property');
const User = require('../models/user');
const { bookingSchema } = require('../schema');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { property: propertyId, checkIn, checkOut, numGuests, message } = value;
    
    // Find property
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check if property is available
    if (!property.isActive || !property.isApproved) {
      return res.status(400).json({ message: 'Property is not available for booking' });
    }
    
    // Check if dates are available in property availability
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Calculate number of nights
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const numNights = Math.round(Math.abs((checkOutDate - checkInDate) / oneDay));
    
    // Calculate total price
    const totalPrice = property.price * numNights;
    
    // Create booking
    const booking = new Booking({
      property: propertyId,
      user: req.user._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      numNights,
      numGuests,
      totalPrice,
      message
    });
    
    // Save booking
    const savedBooking = await booking.save();
    
    // Add booking to user's bookings
    await User.findByIdAndUpdate(req.user._id, {
      $push: { bookings: savedBooking._id }
    });
    
    // Update property availability
    for (let d = new Date(checkInDate); d <= checkOutDate; d.setDate(d.getDate() + 1)) {
      property.availability.push({
        date: new Date(d),
        isBooked: true
      });
    }
    await property.save();
    
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
  try {
    let bookings;
    
    // If user is admin, get all bookings
    if (req.user.role === 'admin') {
      bookings = await Booking.find()
        .populate({
          path: 'property',
          select: 'title images location price'
        })
        .populate({
          path: 'user',
          select: 'username firstName lastName email profileImage'
        })
        .sort({ createdAt: -1 });
    } 
    // If user is host, get bookings for their properties
    else if (req.user.role === 'host') {
      // Get all properties owned by the user
      const properties = await Property.find({ owner: req.user._id });
      const propertyIds = properties.map(prop => prop._id);
      
      bookings = await Booking.find({ property: { $in: propertyIds } })
        .populate({
          path: 'property',
          select: 'title images location price'
        })
        .populate({
          path: 'user',
          select: 'username firstName lastName email profileImage'
        })
        .sort({ createdAt: -1 });
    } 
    // Regular user gets their own bookings
    else {
      bookings = await Booking.find({ user: req.user._id })
        .populate({
          path: 'property',
          select: 'title images location price'
        })
        .sort({ createdAt: -1 });
    }
    
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'property',
        select: 'title description images location price owner category amenities capacity rules',
        populate: {
          path: 'owner',
          select: 'username firstName lastName profileImage'
        }
      })
      .populate({
        path: 'user',
        select: 'username firstName lastName email profileImage phone'
      });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to view the booking
    const isAdmin = req.user.role === 'admin';
    const isBookingOwner = booking.user._id.toString() === req.user._id.toString();
    const isPropertyOwner = booking.property.owner._id.toString() === req.user._id.toString();
    
    if (!isAdmin && !isBookingOwner && !isPropertyOwner) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to cancel the booking
    const isAdmin = req.user.role === 'admin';
    const isBookingOwner = booking.user.toString() === req.user._id.toString();
    const property = await Property.findById(booking.property);
    const isPropertyOwner = property.owner.toString() === req.user._id.toString();
    
    if (!isAdmin && !isBookingOwner && !isPropertyOwner) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    // Check if booking can be canceled (not already canceled or completed)
    if (booking.status === 'canceled') {
      return res.status(400).json({ message: 'Booking is already canceled' });
    }
    
    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Completed bookings cannot be canceled' });
    }
    
    // Set cancellation info
    booking.status = 'canceled';
    
    if (isAdmin) {
      booking.canceledBy = 'admin';
    } else if (isPropertyOwner) {
      booking.canceledBy = 'host';
    } else {
      booking.canceledBy = 'guest';
    }
    
    // Calculate refund amount based on cancellation policy
    // This is a simple implementation - you can make it more complex based on your requirements
    const currentDate = new Date();
    const checkInDate = new Date(booking.checkIn);
    const daysUntilCheckIn = Math.ceil((checkInDate - currentDate) / (1000 * 60 * 60 * 24));
    
    if (daysUntilCheckIn > 7) {
      // Full refund if canceled more than 7 days before check-in
      booking.refundAmount = booking.totalPrice;
    } else if (daysUntilCheckIn > 3) {
      // 50% refund if canceled between 3-7 days before check-in
      booking.refundAmount = booking.totalPrice * 0.5;
    } else {
      // No refund if canceled less than 3 days before check-in
      booking.refundAmount = 0;
    }
    
    // Update availability in property
    for (let d = new Date(booking.checkIn); d <= booking.checkOut; d.setDate(d.getDate() + 1)) {
      // Find and remove the availability entry
      const dateStr = d.toISOString().split('T')[0];
      const availabilityIndex = property.availability.findIndex(
        a => a.date.toISOString().split('T')[0] === dateStr && a.isBooked
      );
      
      if (availabilityIndex !== -1) {
        property.availability.splice(availabilityIndex, 1);
      }
    }
    
    await property.save();
    await booking.save();
    
    res.status(200).json({
      message: 'Booking canceled successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Complete booking payment
// @route   PUT /api/bookings/:id/pay
// @access  Private
const completePayment = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Validate payment info
    if (!req.body.paymentInfo || !req.body.paymentInfo.id) {
      return res.status(400).json({ message: 'Payment information is required' });
    }
    
    // Update booking with payment information
    booking.paymentStatus = 'completed';
    booking.status = 'confirmed';
    booking.paymentInfo = {
      id: req.body.paymentInfo.id,
      status: req.body.paymentInfo.status,
      method: req.body.paymentInfo.method,
      tax: req.body.paymentInfo.tax || 0
    };
    
    // Generate invoice ID
    booking.invoiceId = `INV-${Date.now().toString().substring(7)}-${booking._id.toString().substring(18)}`;
    
    await booking.save();
    
    res.status(200).json({
      message: 'Payment completed successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Generate booking invoice
// @route   GET /api/bookings/:id/invoice
// @access  Private
const generateInvoice = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'property',
        select: 'title location price',
        populate: {
          path: 'owner',
          select: 'firstName lastName email'
        }
      })
      .populate({
        path: 'user',
        select: 'firstName lastName email'
      });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized
    const isAdmin = req.user.role === 'admin';
    const isBookingOwner = booking.user._id.toString() === req.user._id.toString();
    const isPropertyOwner = booking.property.owner._id.toString() === req.user._id.toString();
    
    if (!isAdmin && !isBookingOwner && !isPropertyOwner) {
      return res.status(403).json({ message: 'Not authorized to view this invoice' });
    }
    
    // Check if payment is completed
    if (booking.paymentStatus !== 'completed') {
      return res.status(400).json({ message: 'Invoice can only be generated for paid bookings' });
    }
    
    // Create a PDF document
    const doc = new PDFDocument();
    const invoicePath = path.join(__dirname, '..', 'uploads', `invoice-${booking._id}.pdf`);
    const writeStream = fs.createWriteStream(invoicePath);
    
    doc.pipe(writeStream);
    
    // Add invoice content
    doc.fontSize(20).text('INVOICE', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice Number: ${booking.invoiceId || 'N/A'}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    
    // Customer information
    doc.fontSize(14).text('Customer Information:');
    doc.fontSize(12).text(`Name: ${booking.user.firstName} ${booking.user.lastName}`);
    doc.text(`Email: ${booking.user.email}`);
    doc.moveDown();
    
    // Property information
    doc.fontSize(14).text('Property Information:');
    doc.fontSize(12).text(`Property: ${booking.property.title}`);
    doc.text(`Location: ${booking.property.location.address}, ${booking.property.location.city}, ${booking.property.location.state}, ${booking.property.location.country}`);
    doc.moveDown();
    
    // Booking details
    doc.fontSize(14).text('Booking Details:');
    doc.fontSize(12).text(`Check-in: ${new Date(booking.checkIn).toLocaleDateString()}`);
    doc.text(`Check-out: ${new Date(booking.checkOut).toLocaleDateString()}`);
    doc.text(`Number of Nights: ${booking.numNights}`);
    doc.text(`Number of Guests: ${booking.numGuests}`);
    doc.moveDown();
    
    // Payment details
    doc.fontSize(14).text('Payment Details:');
    doc.fontSize(12).text(`Price per Night: $${booking.property.price}`);
    doc.text(`Subtotal: $${booking.property.price * booking.numNights}`);
    doc.text(`Tax: $${booking.paymentInfo.tax || 0}`);
    doc.text(`Total Amount: $${booking.totalPrice}`);
    doc.text(`Payment Status: ${booking.paymentStatus}`);
    doc.text(`Payment Method: ${booking.paymentInfo.method || 'N/A'}`);
    doc.text(`Payment ID: ${booking.paymentInfo.id || 'N/A'}`);
    
    // End the document
    doc.end();
    
    // Wait for writing to finish
    writeStream.on('finish', () => {
      // Send file to client
      res.download(invoicePath, `invoice-${booking._id}.pdf`, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error downloading invoice' });
        }
        
        // Delete the file after sending
        fs.unlinkSync(invoicePath);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
  completePayment,
  generateInvoice
}; 