const express = require('express');
const { postController } = require('../controllers/index');
const { validateToken } = require('../middlewares/validateJWT');

const postRouter = express.Router();

postRouter.get('/', validateToken, postController.getAllPosts);
postRouter.get('/:id', validateToken, postController.getPostById);
postRouter.post('/', validateToken, postController.createPost);

module.exports = postRouter;