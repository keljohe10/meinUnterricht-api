jest.mock('../../../src/lib/helpers/elastic.js');

const moviesServices = require('../../../src/lib/movies/movies.service');
const { knexConnection } = require('../../knexTestHelper');

const { saveKeyword, searchKeyword } = require('../../../src/lib/helpers/elastic');

describe('movies/service', () => {
  describe('all', () => {
    subject(() => moviesServices.all({ pageConfig: get('pageConfig'), search: get('search') }));

    beforeEach(async () => {
      const movieToInsert = [
        {
          imbd_id: '507f191e810c19729de860e1',
          title: 'Race to Space',
          director: 'Sean McNamara',
          plot: 'In the 1960s a young woman works at NASA as an animal trainer responsible for the chimpanzee who will go into space.',
          poster: 'https://m.media-amazon.com/images/M/MV5BMTczNDUwMDA1NV5BMl5BanBnXkFtZTcwNTA5MTAwMQ@@._V1_SX300.jpg',
          year: '2001'
        },
        {
          imbd_id: '507f191e810c19729de860e2',
          title: 'mock',
          director: 'McNamara',
          plot: 'In the 1960s',
          poster: 'https://m.media-amazon.com/images/M/MV5BMTczNDUwMDA1NV5BMl5BanBnXkFtZTcwNTA5MTAwMQ@@._V1_SX300.jpg',
          year: '2001'
        },
      ];
      await knexConnection('movies').insert(movieToInsert);
    });

    describe('when getting the first page (size 2)', () => {
      beforeEach(() => {
        saveKeyword.mockImplementation(() => {});
        searchKeyword.mockImplementation(() => undefined);
      });

      def('pageConfig', () => ({ page: 0, pageSize: 2 }));

      it('returns the list of movies and the total movies count', async () => {
        const movies = await subject();
        expect(movies).toMatchObject({
          results: [
            {
              imbd_id: '507f191e810c19729de860e1',
              title: 'Race to Space',
              director: 'Sean McNamara',
              plot: 'In the 1960s a young woman works at NASA as an animal trainer responsible for the chimpanzee who will go into space.',
              poster: 'https://m.media-amazon.com/images/M/MV5BMTczNDUwMDA1NV5BMl5BanBnXkFtZTcwNTA5MTAwMQ@@._V1_SX300.jpg',
            },
            {
              imbd_id: '507f191e810c19729de860e2',
              title: 'mock',
              director: 'McNamara',
              plot: 'In the 1960s',
              poster: 'https://m.media-amazon.com/images/M/MV5BMTczNDUwMDA1NV5BMl5BanBnXkFtZTcwNTA5MTAwMQ@@._V1_SX300.jpg',
            }
          ],
          total: 2,
        });
      });
    });
    describe('when filtering the results', () => {
      def('pageConfig', () => ({ page: 0, pageSize: 2 }));
      def('search', () => 'mock');

      it('returns data', async () => {
        const movies = await subject();
        expect(movies).toMatchObject({
          results: [
            {
              imbd_id: '507f191e810c19729de860e2',
              title: 'mock',
              director: 'McNamara',
              plot: 'In the 1960s',
              poster: 'https://m.media-amazon.com/images/M/MV5BMTczNDUwMDA1NV5BMl5BanBnXkFtZTcwNTA5MTAwMQ@@._V1_SX300.jpg',
              year: '2001'
            },
          ],
          total: 1,
        });
      });
    });
  });
});
