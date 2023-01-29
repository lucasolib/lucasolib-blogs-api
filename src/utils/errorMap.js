const errorMap = {
  USER_ALREADY_EXIST: 409,
  INVALID_VALUE: 400,
  UNDEFINED_VALUE: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};