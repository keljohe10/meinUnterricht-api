const Router = require('@koa/router');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/', (ctx) => {
  ctx.body = { hello: 'World' };
});

module.exports = apiRouter;
