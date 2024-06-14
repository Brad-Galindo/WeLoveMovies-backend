/**
 * Error-handling middleware function for Express
 * Logs the error and sends a JSON response with status and error message.
 * This should be the last middleware in the stack.
 */
function errorHandler(error, req, res, next) {
  console.error(error); // Log the error for debugging

  const { status = 500, message = "Something went wrong!" } = error; // Default to 500 if status not provided

  res.status(status).json({ error: message }); // Send error response
}

module.exports = errorHandler;
