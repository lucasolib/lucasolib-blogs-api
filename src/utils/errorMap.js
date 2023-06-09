const errorMap = {
  USER_ALREADY_EXIST: 409,
  CATEGORY_ALREADY_EXIST: 409,
  USER_DOES_NOT_EXIST: 404,
  POST_DOES_NOT_EXIST: 404,
  UNATHORIZED_USER: 401,
  INVALID_VALUE: 400,
  UNDEFINED_VALUE: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};