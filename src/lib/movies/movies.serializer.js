const { Serializer } = require('../../../lib');

class MovieSerializer extends Serializer {
  constructor() {
    super({ collectionName: 'movies' });

    this.baseFields = ['title', 'director', 'plot', 'poster'];

    this.meta = {
      imbdID: Serializer.renamed('imbd_id'),
    };
  }
}

module.exports = MovieSerializer;
