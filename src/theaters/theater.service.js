const knex = require('../db/connection');
const reduceProperties = require('../utils/reduce-properties');

/**
 * Defines how to transform the joined result set into a nested structure.
 * Reduces the list of movies into a nested array under each theater.
 * The structure is defined so that movies will be grouped under their respective theaters.
 */
const reduceMovies = reduceProperties('theater_id', {
  movie_id: ['movies', null, 'movie_id'],
  title: ['movies', null, 'title'],
  runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
  rating: ['movies', null, 'rating'],
  description: ['movies', null, 'description'],
  image_url: ['movies', null, 'image_url'],
  created_at: ['movies', null, 'created_at'],
  updated_at: ['movies', null, 'updated_at'],
  is_showing: ['movies', null, 'is_showing'],
  theater_id: ['movies', null, 'theater_id'],
});

/**
 * Retrieves a list of theaters along with the movies currently being shown in each theater.
 * Joins the `theaters`, `movies_theaters`, and `movies` tables to gather the required information.
 */
function list() {
  return knex('theaters as t')
    .join('movies_theaters as mt', 't.theater_id', 'mt.theater_id') // Join theaters with movies_theaters using theater_id
    .join('movies as m', 'mt.movie_id', 'm.movie_id') // Join movies_theaters with movies using movie_id
    .select(
      't.*', // Select all theater fields
      'm.movie_id', // Select specific movie fields to nest under each theater
      'm.title',
      'm.runtime_in_minutes',
      'm.rating',
      'm.description',
      'm.image_url',
      'm.created_at as movie_created_at',
      'm.updated_at as movie_updated_at',
      'mt.is_showing',
      'mt.theater_id as showing_theater_id'
    )
    .then(reduceMovies); // Reduce the result set to include movies under their respective theaters
}

module.exports = {
  list,
};
