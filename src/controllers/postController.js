const { postService } = require('../services');
const errorMap = require('../utils/errorMap');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const { type, message } = await postService.createPost(id, title, content, categoryIds);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(201).json(message);
};

const getAllPosts = async (req, res) => {
  const { type, message } = await postService.getAllPosts();
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getPostById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const updatePostById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, content } = req.body;
  const { type, message } = await postService.updatePostById(id, userId, title, content);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { type, message } = await postService.deletePostById(id, userId);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(204).end();
};

const getPostByQuery = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await postService.getPostByQuery(q);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  getPostByQuery,
};