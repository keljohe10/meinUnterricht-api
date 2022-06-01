const { axiosClient } = require('../lib/helpers');
const { TIMEOUT_GET_HTTP = 12000, PAGES = 10, OMD_API_URL, API_KEY } = process.env;

exports.seed = async (knex, PromiseKnex) => {
  const axios = axiosClient();

  const pages = Array.from({ length: PAGES }, (_, i) => i + 1);
  let movies = [];

  for (const page of pages) {
    try {
      const { data } = await axios.get(`${OMD_API_URL}`, {
        params: {
          apikey: API_KEY,
          type: 'movie',
          y: '2001',
          s: 'space',
          page: page,
        },
        timeout: TIMEOUT_GET_HTTP,
      });

      if (data.Error === 'Movie not found!') break;

      const { Search } = data;
      movies = [...movies, ...Search];
    } catch (error) {
      console.error(error);
    }
  }

  const promises = movies.map(async (movie) => {
    const { data } = await axios.get(`${OMD_API_URL}`, {
      params: {
        apikey: API_KEY,
        i: movie.imdbID,
        plot: 'full',
      },
      timeout: TIMEOUT_GET_HTTP,
    });

    return {
      title: movie.Title,
      year: movie.Year,
      imbd_id: movie.imdbID,
      poster: movie.Poster,
      director: data.Director,
      plot: data.Plot,
    };
  });

  const response = await Promise.all(promises);

  await knex.raw('TRUNCATE TABLE movies RESTART IDENTITY CASCADE');
  return knex('movies').then(() => knex('movies').insert(response));
};
