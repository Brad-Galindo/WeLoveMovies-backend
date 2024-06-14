/**
 * Middleware to handle HTTP methods that are not allowed.
 */
function methodNotAllowed(req, res, next) {
  res.status(405).json({ error: `Method ${req.method} not allowed on ${req.originalUrl}` }); // Respond with 405 status and error message
}

module.exports = methodNotAllowed;
