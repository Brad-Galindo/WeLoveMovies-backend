/**
 * Middleware to handle requests to endpoints that are not found (404).
 */
function notFound(req, res, next) {
  res.status(404).json({ error: `Not found: ${req.originalUrl}` }); // Respond with 404 status and error message
}

module.exports = notFound;
