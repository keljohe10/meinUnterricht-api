const { Serializer } = require('../../../lib');

class MovieSerializer extends Serializer {
  constructor() {
    super({ collectionName: 'movies' });

    this.baseFields = ['id', 'title', 'director', 'plot', 'year', 'poster'];

    this.meta = {
      imbdID: Serializer.renamed('imbd_id'),
    };
  }
}

module.exports = MovieSerializer;
