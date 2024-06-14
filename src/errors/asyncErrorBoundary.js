/**
 * Wrapper function to handle errors in asynchronous route handlers.
 */
function asyncErrorBoundary(handler, defaultStatus) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next); // Execute the handler
    } catch (error) {
      if (defaultStatus) {
        error.status = defaultStatus; // Set default status if provided
      }
      next(error); // Pass the error to Express's error handling middleware
    }
  };
}

module.exports = asyncErrorBoundary;
