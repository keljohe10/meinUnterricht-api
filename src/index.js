require('dotenv').config();

const constants = require('./constants');

const { initializeApp } = require('../lib');

const router = require('./web');
const errorCodeToStatusMap = require('./config/errorCodeStatusMap');
const knexfile = require('../knexfile');
const { checkConnection, createIndex, esclient, mappingIndex } = require('../lib/helpers/elastic');
const { INDEX_ELASTIC = 'movies' } = process.env;

const app = initializeApp({
  router,
  errorCodeToStatusMap,
  knexfile,
});

(async function main() {
  const isElasticReady = await checkConnection();
  if (isElasticReady) {
    const elasticIndex = await esclient.indices.exists({ index: INDEX_ELASTIC });
    if (!elasticIndex.body) {
      await createIndex(INDEX_ELASTIC);
      await mappingIndex(INDEX_ELASTIC);
    }
  }

  app.listen(constants.PORT);
})();
