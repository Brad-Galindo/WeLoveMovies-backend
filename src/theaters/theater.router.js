// Load the Express framework
const router = require('express').Router(); // Create a new router instance

// Load the theater controller module
const controller = require('./theater.controller');

// Load middleware for handling unsupported HTTP methods
const methodNotAllowed = require('../errors/methodNotAllowed');

// Route for listing theaters
router.route('/')
  .get(controller.list) // Handle GET requests to list theaters
  .all(methodNotAllowed); // Reject unsupported methods

// Export the router to be used by the main application
module.exports = router;
