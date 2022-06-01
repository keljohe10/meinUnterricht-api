const Router = require('@koa/router');

const router = new Router();
const moviesLib = require('../lib/movies');
const { withResponseMiddleware } = require('../../lib');

const { MovieSerializer } = moviesLib;
const moviesIndexSerializer = new MovieSerializer();

router.get(
  '/',
  withResponseMiddleware(
    moviesIndexSerializer,
    (ctx) =>
      moviesLib.all({
        pageConfig: ctx.state.pageConfig,
        search: ctx.query.s,
      }),
    {
      paged: true,
      defaultPageSize: 20,
    },
  ),
);

module.exports = router;
