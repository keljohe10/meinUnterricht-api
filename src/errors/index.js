const {
  libHelpers: { buildErrorClasses },
} = require('../../lib');

const errorsMap = buildErrorClasses(['BadRequest', 'ValidationError', 'NotFound']);

module.exports = errorsMap;
