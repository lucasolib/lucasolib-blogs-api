const { Op } = require('sequelize');
const { validatePost } = require('./validations/validateInput');

const { BlogPost, Category, PostCategory, User } = require('../models');

const createPost = async (userId, title, content, categoryIds) => {
  try {
    const error = validatePost(userId, title, content, categoryIds);
    if (error.type) return error;
    const verifyCategories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
    if (verifyCategories.length !== categoryIds.length) {
      return { type: 'INVALID_VALUE', message: 'one or more "categoryIds" not found' };
    } const newPost = await BlogPost.create(
      { title, content, categoryIds, userId, updated: new Date(), published: new Date() },
    );
    const categories = categoryIds.map((id) => ({ postId: newPost.id, categoryId: id }));
    await PostCategory.bulkCreate(categories);
    return { type: null, message: newPost };
  } catch (e) {
    return { type: 500, message: e };
  }
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['user_id'] },
    include: [
      { model: Category, through: { attributes: [] }, as: 'categories' },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  return { type: null, message: posts };
};

module.exports = {
  createPost,
  getAllPosts,
};