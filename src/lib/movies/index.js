const { Movie } = require('./movies.model');
const MovieSerializer = require('./movies.serializer');
const moviesService = require('./movies.service');

module.exports = {
  Movie,
  MovieSerializer,
  ...moviesService,
};
