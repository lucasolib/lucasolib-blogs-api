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

const validatePost = (userId, title, content, categoryIds) => {
  const { error } = schemas.postSchema.validate({ userId, title, content, categoryIds });
  if (error) return { type: 'INVALID_VALUE', message: 'Some required fields are missing' };
  return { type: null, message: '' };
};

const validateCategory = (name) => {
  const { error } = schemas.categorySchema.validate(name);
  if (error) return { type: 'INVALID_VALUE', message: '"name" is required' };
  return { type: null, message: '' };
};

module.exports = {
  validateUser,
  validateCategory,
  validatePost,
};