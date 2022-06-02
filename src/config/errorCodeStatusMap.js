const { ValidationError } = require('../errors');

const errorCodeToStatusMap = {
  [ValidationError.code]: 400,
};

module.exports = errorCodeToStatusMap;
