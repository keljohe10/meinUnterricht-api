jest.mock('../../src/lib/movies/movies.service.js');
const request = require('supertest');
const { initializeApp } = require('../../lib');

const moviesServices = require('../../src/lib/movies/movies.service');
const moviesRouter = require('../../src/web/movies.router');
const { moviesSerializer, moviesServicesResponse } = require('../fixtures/movies');

describe('users/router', () => {
  def('app', () => initializeApp({ router: moviesRouter }));

  def('server', () => get('app').listen());

  afterEach(() => {
    get('server').close();
  });

  beforeEach(() => {
    jest.resetModules();
  });

  describe('GET /', () => {
    describe('all', () => {
      subject(() => {
        const server = get('server');
        const query = get('query');
        return request(server).get('/').query(query);
      });

      beforeEach(() => {
        const serviceResponse = {
          results: [moviesServicesResponse],
          total: 1,
        };
        moviesServices.all.mockImplementation(() => serviceResponse);
      });

      const itSendsExpectedResponse = ({ page, pageSize }) => {
        it('sends the expected response', async () => {
          const response = await subject();
          expect(response.status).toBe(200);
          expect(response.body).toMatchObject({
            movies: [moviesSerializer],
            pageData: { total: 1, page, pageSize },
          });
        });
      };

      const defaultPageConfig = { page: 0, pageSize: 20 };

      describe('when no query is passed', () => {
        def('query', () => undefined);

        it('passes default page config to the service', async () => {
          await subject();
          expect(moviesServices.all).toHaveBeenCalledWith({ pageConfig: defaultPageConfig });
        });

        itSendsExpectedResponse(defaultPageConfig);
      });

      describe('when a query is passed', () => {
        describe('when pagination parameters are passed', () => {
          def('query', () => ({ page: 2, pageSize: 20 }));

          it('passes them to the service', async () => {
            await subject();
            expect(moviesServices.all).toHaveBeenCalledWith({
              pageConfig: { page: 2, pageSize: 20 },
            });
          });

          itSendsExpectedResponse({ page: 2, pageSize: 20 });
        });

        describe('when the results are filtered by title/director/plot', () => {
          def('query', () => ({ s: 'Race' }));

          it('passes it to the service properly', async () => {
            await subject();
            expect(moviesServices.all).toHaveBeenCalledWith({
              search: 'Race',
              pageConfig: defaultPageConfig,
            });
          });

          itSendsExpectedResponse(defaultPageConfig);
        });
      });
    });
  });
});
