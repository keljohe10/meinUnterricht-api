const { esclient } = require('../../../lib/helpers/elastic');
const { ValidationError } = require('../../errors');
const { INDEX_ELASTIC = 'movies' } = process.env;

const searchKeyword = async (text) => {
  let results;

  try {
    const {
      body: { hits },
    } = await esclient.search({
      index: INDEX_ELASTIC,
      body: {
        _source: 'response',
        query: {
          match: { search: text },
        },
      },
    });
  
    if (hits.hits.length) {
      const {
        _source: { response },
      } = hits.hits[0];
  
      results = response;
    }
    return results;
  } catch (error) {
    throw new ValidationError({
      details: `Error: [searchKeyword]`,
    });
  }
  
};

const saveKeyword = async (text, data) => {
  try {
    await esclient.index({
      index: INDEX_ELASTIC,
      body: {
        search: text,
        response: data,
      },
    });
  } catch (error) {
    throw new ValidationError({
      details: `Error: [saveKeyword]`,
    });
  }
  
}

module.exports = { searchKeyword, saveKeyword };