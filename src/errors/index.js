const {
  libHelpers: { buildErrorClasses },
} = require('../../lib');

const errorsMap = buildErrorClasses(['BadRequest', 'ValidationError']);

module.exports = errorsMap;
