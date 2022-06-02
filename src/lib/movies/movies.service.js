const { Movie } = require('./movies.model');

const all = ({ pageConfig: { page, pageSize }, search }) => {
  const textToUpperCase = search ? search.toUpperCase() : null;

  return Movie.query()
    .page(page, pageSize)
    .modify((builder) => {
      if (textToUpperCase) builder.modify('search', textToUpperCase);
    })
    .returning('*');
};

module.exports = { all };
