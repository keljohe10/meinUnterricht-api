const { Model } = require('objection');

class Movie extends Model {
  static get tableName() {
    return 'movies';
  }

  static get modifiers() {
    return {
      search(builder, text) {
        builder.where((bd) => {
          bd.whereRaw(`UPPER(title) LIKE ?`, [`%${text}%`])
            .orWhereRaw(`UPPER(plot) LIKE ?`, [`%${text}%`])
            .orWhereRaw(`UPPER(director) LIKE ?`, [`%${text}%`]);
        });
      },
    };
  }
}

module.exports = { Movie };
