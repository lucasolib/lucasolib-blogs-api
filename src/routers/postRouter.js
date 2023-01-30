const express = require('express');
const { postController } = require('../controllers/index');
const { validateToken } = require('../middlewares/validateJWT');

const postRouter = express.Router();

postRouter.get('/', validateToken, postController.getAllPosts);
postRouter.post('/', validateToken, postController.createPost);

module.exports = postRouter;