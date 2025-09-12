/**
 * Middleware to validate request data against a Joi schema
 * @param {Object} schema - Joi schema for validation
 * @param {String} source - Source of data to validate (body, query, params)
 * @returns {Function} - Express middleware function
 */
const validateRequest = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true
    });

    if (!error) {
      return next();
    }

    // Format validation errors
    const errors = error.details.reduce((acc, detail) => {
      const key = detail.path[0];
      const message = detail.message.replace(/"/g, "'");
      
      if (!acc[key]) {
        acc[key] = message;
      }
      
      return acc;
    }, {});

    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  };
};

/**
 * Middleware to sanitize request data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const sanitizeData = (req, res, next) => {
  // Function to sanitize a string
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str.trim().replace(/[<>]/g, '');
  };

  // Function to recursively sanitize an object
  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;

    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map(item => sanitizeObject(item));
    }

    // Handle objects
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = sanitizeString(value);
      } else if (value && typeof value === 'object') {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  };

  // Sanitize request body, query and params
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }

  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }

  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeObject(req.params);
  }

  next();
};

module.exports = {
  validateRequest,
  sanitizeData
}; 