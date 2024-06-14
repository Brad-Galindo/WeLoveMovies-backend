const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const knex = require('../db/connection');

/**
 * Middleware to check if a review exists by its ID.
 * If the review exists, attaches it to `res.locals` and proceeds to the next middleware.
 * If not, responds with a 404 error.
 */
async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);

  if (review) {
    res.locals.review = review; // Attach the found review to res.locals
    return next(); // Proceed to the next middleware or route handler
  }
  // Review not found, respond with a 404 error
  return res.status(404).json({ error: "Review cannot be found." });
}

/**
 * Deletes a review by its ID.
 */
async function deleteReview(req, res, next) {
  const { reviewId } = req.params;

  try {
    await service.deleteReview(reviewId);
    return res.sendStatus(204); // No Content
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
}

/**
 * Updates an existing review with new data.
 */
async function updateReview(req, res, next) {
  const updatedReview = {
    ...res.locals.review, // Existing review details
    ...req.body.data, // New data from the request body
    review_id: res.locals.review.review_id, // Ensure the review ID remains unchanged
  };

  try {
    const data = await service.update(updatedReview);

    // Fetch critic details associated with the review
    const critic = await knex('critics')
      .select('*')
      .where({ critic_id: data.critic_id })
      .first();

    data.critic = critic; // Attach critic details to the updated review

    return res.status(200).json({ data }); // Respond with the updated review and associated critic details
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return next(error); // Pass errors to the error handler
  }
}

module.exports = {
  deleteReview: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(deleteReview)], // Wrap deleteReview in error handling middleware
  updateReview: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(updateReview)], // Wrap updateReview in error handling middleware
};
