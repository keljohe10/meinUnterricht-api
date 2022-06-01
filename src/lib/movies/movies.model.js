const { Model } = require('objection');

class Movie extends Model {
  static get tableName() {
    return 'movies';
  }

  static get modifiers() {
    return {
      search(builder, search) {
        const searchToUpperCase = search.toUpperCase();
        builder.where((bd) => {
          bd.whereRaw(`UPPER(title) LIKE ?`, [`%${searchToUpperCase}%`])
            .orWhereRaw(`UPPER(plot) LIKE ?`, [`%${searchToUpperCase}%`])
            .orWhereRaw(`UPPER(director) LIKE ?`, [`%${searchToUpperCase}%`]);
        });
      },
    };
  }
}

module.exports = { Movie };
