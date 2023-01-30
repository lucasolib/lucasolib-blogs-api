const { Op } = require('sequelize');
const { validatePost, validateUpdatePost } = require('./validations/validateInput');

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

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    attributes: { exclude: ['user_id'] },
    where: { id },
    include: [
      { model: Category, through: { attributes: [] }, as: 'categories' },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  if (!post) return { type: 'POST_DOES_NOT_EXIST', message: 'Post does not exist' };
  return { type: null, message: post };
};

const updatePostById = async (id, userId, title, content) => {
  const error = validateUpdatePost(userId, title, content);
  if (error.type) return error;
  const post = await BlogPost.findOne({
    where: { id },
  });
  if (post.userId !== userId) return { type: 'UNATHORIZED_USER', message: 'Unauthorized user' };
  await BlogPost.update({ title, content }, { where: { id } });
  const updatedPost = await BlogPost.findOne({
    attributes: { exclude: ['user_id'] },
    where: { id },
    include: [
      { model: Category, through: { attributes: [] }, as: 'categories' },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  return { type: null, message: updatedPost };
};

const deletePostById = async (id, userId) => {
  const post = await BlogPost.findOne({
    where: { id },
  });
  if (!post) return { type: 'POST_DOES_NOT_EXIST', message: 'Post does not exist' };
  if (post.userId !== userId) return { type: 'UNATHORIZED_USER', message: 'Unauthorized user' };
  await BlogPost.destroy({
    where: { id },
  });
  return { type: null, message: '' };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};