const { Category } = require('../models');
const { validateCategory } = require('./validations/validateInput');

const createCategory = async (name) => {
  const error = validateCategory(name);
  if (error.type) return error;
  const category = await Category.findOne({
    attributes: ['name'],
    where: { name },
  });
  if (category) return { type: 'CATEGORY_ALREADY_EXIST', message: 'Category already registered' };
  const createdCategory = await Category.create({ name });
  return { type: null, message: createdCategory };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { type: null, message: categories };
};

module.exports = {
  createCategory,
  getAllCategories,
};