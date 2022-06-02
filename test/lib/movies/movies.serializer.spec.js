const { MovieSerializer } = require('../../../src/lib/movies');

describe('movies/serializer', () => {
  const serviceOutput = {
    id: 1,
    title: 'Race to Space',
    director: 'Sean McNamara',
    plot: 'In the 1960s a young woman works at NASA as an animal trainer responsible for the chimpanzee who will go into space.',
    year: '2001',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTczNDUwMDA1NV5BMl5BanBnXkFtZTcwNTA5MTAwMQ@@._V1_SX300.jpg',
    imbd_id: 'tt0167360',
  };

  describe('by default', () => {
    subject(() => new MovieSerializer().serialize(serviceOutput));

    it('serializes properly', () => {
      const serializerOutput = {
        title: 'Race to Space',
        director: 'Sean McNamara',
        plot: 'In the 1960s a young woman works at NASA as an animal trainer responsible for the chimpanzee who will go into space.',
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTczNDUwMDA1NV5BMl5BanBnXkFtZTcwNTA5MTAwMQ@@._V1_SX300.jpg',
        imbdID: 'tt0167360',
      };

      expect(subject()).toEqual(serializerOutput);
    });
  });
});
