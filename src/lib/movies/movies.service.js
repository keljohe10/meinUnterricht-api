const { Movie } = require('./movies.model');

const all = ({ pageConfig: { page, pageSize }, search }) =>
  Movie.query()
    .page(page, pageSize)
    .modify((builder) => {
      if (search) builder.modify('search', search);
    })
    .returning('*');

module.exports = { all };
