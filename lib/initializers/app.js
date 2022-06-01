const Koa = require('koa');
const cors = require('@koa/cors');
const addExtendedQsParser = require('koa-qs');
const bodyParser = require('koa-bodyparser');

const errorHandlerMiddleware = require('../middlewares/errorHandler');
const { initializeOrm } = require('./orm');

function initializeApp({ router, errorCodeToStatusMap, knexfile } = {}) {
  if (knexfile) initializeOrm({ knexfile });

  const app = new Koa();

  addExtendedQsParser(app);

  app.use(bodyParser());

  if (errorCodeToStatusMap) {
    app.use(errorHandlerMiddleware(errorCodeToStatusMap));
  }

  if (router) {
    app.use(cors());
    app.use(router.routes());
  }

  return app;
}

module.exports = {
  initializeApp,
};
