const knex = require('../db/connection');

/**
 * Retrieves a single review by its ID.
 */
function read(reviewId) {
  return knex('reviews')
    .select('*') // Select all columns from the reviews table
    .where({ review_id: reviewId }) // Filter by the specific review ID
    .first(); // Return only the first matching review (as there should only be one)
}

/**
 * Deletes a review by its ID.
 */
function deleteReview(reviewId) {
  return knex('reviews')
    .where({ review_id: reviewId }) // Filter by the specific review ID
    .del(); // Delete the matching review
}

/**
 * Updates an existing review.
 */
async function update(updatedReview) {
  await knex('reviews')
    .where({ review_id: updatedReview.review_id }) // Filter by the specific review ID
    .update(updatedReview); // Update the review with the new data

  return read(updatedReview.review_id); // Fetch and return the updated review
}

module.exports = {
  read,
  deleteReview,
  update,
};
