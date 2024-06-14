// Load environment variables from .env file if available
// This allows settings such as API keys and ports to be easily configured in different environments.
if (process.env.USER) require("dotenv").config();

const express = require('express');
const cors = require('cors');

// Import route handlers for different resources
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require('./theaters/theater.router');

// Import error handling middleware
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

// Enable CORS for cross-origin requests
// This is important when the frontend is hosted on a different domain than the backend.
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Route mappings to specific routers
// Each of these routes will use the respective router to handle requests
app.use('/reviews', reviewsRouter);    // Routes for managing reviews
app.use('/movies', moviesRouter);      // Routes for managing movies
app.use('/theaters', theatersRouter);  // Routes for managing theaters

// Middleware to handle 404 Not Found errors
app.use(notFound);

// General error-handling middleware
// This will catch and process errors from anywhere in the routing chain
app.use(errorHandler);

// Export the app module for use in other parts of the application, such as the server entry point
module.exports = app;
