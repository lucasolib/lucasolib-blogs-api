const schemas = require('./schemas');

const validateUser = (displayName, email, password, image) => {
  const { error } = schemas.userSchema.validate({ displayName, email, password, image });
  if (error) {
    return {
      type: error.message.includes('required') ? 'UNDEFINED_VALUE' : 'INVALID_VALUE', 
      message: error.message,
  };
} return { type: null, message: '' };
};

module.exports = {
  validateUser,
};