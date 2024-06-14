// Load the Express framework
const express = require('express');

// Load the movies controller module
const controller = require('./movies.controller');

// Load middleware for handling unsupported HTTP methods
const methodNotAllowed = require("../errors/methodNotAllowed");

// Create a new router instance
const router = express.Router();

// Route for handling movie listings and creation
router
  .route('/')
  .get(controller.list); 

// Route for handling specific movie by ID
router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed); // Reject unsupported methods

 // Route for listing theaters showing a specific movie
router
  .route("/:movieId/theaters")
  .get(controller.readTheaters)
  .all(methodNotAllowed); // Reject unsupported methods

// Route for listing reviews for a specific movie
router
  .route("/:movieId/reviews")
  .get(controller.readReviews)
  .all(methodNotAllowed); // Reject unsupported methods

// Export the router to be used by the main application
module.exports = router;
