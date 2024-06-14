const service = require('./movies.service');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * Lists all movies. If the `is_showing` query parameter is true,
 * lists only movies currently showing in theaters.
 */
async function list(req, res, next) {
  try {
    const { is_showing } = req.query;
    // Call service to list movies, optionally filtering for currently showing movies
    const data = await service.list(is_showing === 'true');
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware to check if a movie exists by its ID.
 * If the movie exists, attaches it to `res.locals` and proceeds to the next middleware.
 * If not, responds with a 404 error.
 */
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie; // Attach the found movie to res.locals
    return next(); // Proceed to the next middleware or route handler
  }
  // Movie not found, respond with a 404 error
  return res.status(404).json({ error: "Movie cannot be found." });
}

/**
 * Sends the movie data stored in `res.locals` as the response.
 */
async function read(req, res) {
  res.json({ data: res.locals.movie });
}

/**
 * Lists all theaters showing a specific movie.
 */
async function readTheaters(req, res, next) {
  const { movieId } = req.params;
  // Call service to list theaters showing the specified movie
  const data = await service.readTheaters(movieId);
  res.json({ data });
}

/**
 * Lists all reviews for a specific movie, including critic information.
 */
async function readReviews(req, res, next) {
  const { movieId } = req.params;
  const reviews = await service.readReviews(movieId);

  // Manually construct the JSON response with nested critic information
  const formattedReviews = reviews.map(review => ({
    review_id: review.review_id,
    content: review.content,
    score: review.score,
    created_at: review.review_created_at,
    updated_at: review.review_updated_at,
    critic_id: review.critic_id,
    movie_id: review.movie_id,
    critic: {
      critic_id: review.critic_critic_id,
      preferred_name: review.preferred_name,
      surname: review.surname,
      organization_name: review.organization_name,
      created_at: review.critic_created_at,
      updated_at: review.critic_updated_at,
    }
  }));

  res.json({ data: formattedReviews });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
  readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)],
};
