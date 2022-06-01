const { ValidationError, NotFound } = require('../errors');

const errorCodeToStatusMap = {
  [ValidationError.code]: 400,
  [NotFound.code]: 404,
};

module.exports = errorCodeToStatusMap;
