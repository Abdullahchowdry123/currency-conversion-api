const errorHandler = (err, req, res, next) => {
  // Log error
  if (req.logger) {
    req.logger.error({
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method
    });
  }

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message: statusCode === 500 ? 'Internal server error' : err.message,
      code: statusCode
    }
  });
};

module.exports = { errorHandler };