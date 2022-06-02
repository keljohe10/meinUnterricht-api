const { Movie } = require('./movies.model');
const { searchKeyword, saveKeyword } = require('../helpers/elastic');

const all = async ({ pageConfig: { page, pageSize }, search }) => {
  const textToUpperCase = search ? search.toUpperCase() : null;

  if (textToUpperCase) {
    const cachedMovies = await searchKeyword(textToUpperCase);
    if (cachedMovies) return cachedMovies;
  }

  const movies = await Movie.query()
    .page(page, pageSize)
    .modify((builder) => {
      if (textToUpperCase) builder.modify('search', textToUpperCase);
    })
    .returning('*');

  if (textToUpperCase) await saveKeyword(textToUpperCase, movies);

  return movies;
};

module.exports = { all };
