require('dotenv').config();

const constants = require('./constants');

const { initializeApp } = require('../lib');

const router = require('./web');
const errorCodeToStatusMap = require('./config/errorCodeStatusMap');
const knexfile = require('../knexfile');

const app = initializeApp({
  router,
  errorCodeToStatusMap,
  knexfile,
});

app.listen(constants.PORT);
