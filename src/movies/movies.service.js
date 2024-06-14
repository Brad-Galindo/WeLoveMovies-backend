const knex = require('../db/connection');

/**
 * Retrieves a list of movies. If `is_showing` is true, it retrieves only those movies currently being shown in theaters.
 */
function list(is_showing) {
  if (is_showing) {
    return knex('movies as m')
      .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id') // Join the movies and movies_theaters tables
      .select('m.*') // Select all columns from the movies table
      .where({ 'mt.is_showing': true }) // Filter to only include movies currently being shown
      .groupBy('m.movie_id'); // Group by movie ID to avoid duplicates
  } else {
    return knex('movies').select('*'); // Select all movies if is_showing is not true
  }
}

/**
 * Retrieves a single movie by its ID.
 */
function read(movieId) {
  return knex('movies')
    .select('*') // Select all columns from the movies table
    .where({ movie_id: movieId }) // Filter to only include the movie with the given ID
    .first(); // Return the first matching movie (as there should only be one)
}

/**
 * Retrieves a list of theaters that are showing a specific movie.
 */
function readTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id") // Join the theaters and movies_theaters tables
    .select("t.*", "mt.is_showing", "mt.movie_id") // Select all columns from theaters and relevant columns from movies_theaters
    .where({ "mt.movie_id": movieId, "mt.is_showing": true }); // Filter to include only relevant theaters showing the movie
}

/**
 * Retrieves a list of reviews for a specific movie, including critic information for each review.
 */
function readReviews(movieId) {
  return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id') // Join the reviews and critics tables
    .select(
      'r.review_id',
      'r.content',
      'r.score',
      'r.created_at as review_created_at',
      'r.updated_at as review_updated_at',
      'r.critic_id',
      'r.movie_id',
      'c.critic_id as critic_critic_id',
      'c.preferred_name',
      'c.surname',
      'c.organization_name',
      'c.created_at as critic_created_at',
      'c.updated_at as critic_updated_at'
    ) // Select relevant columns from both tables
    .where({ 'r.movie_id': movieId }); // Filter to include only reviews for the given movie ID
}

module.exports = {
  list,
  read,
  readTheaters,
  readReviews,
};
