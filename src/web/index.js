const Router = require('@koa/router');
const moviesRouter = require('./movies.router');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/', (ctx) => {
  ctx.body = { hello: 'World' };
});
apiRouter.use('/movies', moviesRouter.routes());

module.exports = apiRouter;
