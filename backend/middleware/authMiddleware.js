const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Middleware to protect routes, requiring a valid JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Get token from cookie
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "Authentication required. Please log in.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found or deactivated. Please contact support.",
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    // Handle token verification errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid authentication token. Please log in again.",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Your session has expired. Please log in again.",
      });
    }

    console.error("Authentication error:", error);
    res.status(401).json({
      message: "Authentication failed. Please try again.",
    });
  }
};

/**
 * Middleware to restrict access based on user roles
 * @param {...String} roles - Allowed roles for the route
 * @returns {Function} Middleware function
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required before authorization",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Your role (${req.user.role}) does not have permission.`,
      });
    }

    next();
  };
};

/**
 * Middleware to check if user is the host of a property
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const isPropertyHost = (propertyModel) => {
  return async (req, res, next) => {
    try {
      // Get property ID from request parameters
      const propertyId = req.params.id || req.params.propertyId;

      if (!propertyId) {
        return res.status(400).json({
          message: "Property ID is required",
        });
      }

      // Find property
      const property = await propertyModel.findById(propertyId);

      if (!property) {
        return res.status(404).json({
          message: "Property not found",
        });
      }

      // Check if user is the host or admin
      if (
        property.host.toString() === req.user._id.toString() ||
        req.user.role === "admin"
      ) {
        next();
      } else {
        res.status(403).json({
          message: "Not authorized. You are not the host of this property.",
        });
      }
    } catch (error) {
      console.error("isPropertyHost error:", error);
      res.status(500).json({
        message: "Server error while checking property ownership",
      });
    }
  };
};

module.exports = {
  protect,
  authenticate: protect, // Alias for routes that expect 'authenticate'
  authorize,
  isPropertyHost,
};
