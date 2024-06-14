// Load the Express framework
const express = require('express');

const router = express.Router(); // Create a new router instance

// Load the reviews controller module
const controller = require('./reviews.controller');

// Load middleware for handling unsupported HTTP methods
const methodNotAllowed = require('../errors/methodNotAllowed');

// Route for deleting a specific review by ID
router.delete('/:reviewId', controller.deleteReview).all(methodNotAllowed); 

// Route for updating a specific review by ID
router.put('/:reviewId', controller.updateReview).all(methodNotAllowed); 

// Export the router to be used by the main application
module.exports = router;
