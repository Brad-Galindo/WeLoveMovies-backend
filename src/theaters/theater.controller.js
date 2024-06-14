const service = require('./theater.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/**
 * Retrieves a list of theaters including nested movies currently showing in each theater.
 */
async function list(req, res) {
  const data = await service.list(); // Call the service to retrieve list of theaters with movies
  res.json({ data }); // Respond with the data retrieved
}

module.exports = {
  list: asyncErrorBoundary(list), // Wrap the list function with asyncErrorBoundary to handle errors
};
