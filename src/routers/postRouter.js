const express = require('express');
const { postController } = require('../controllers/index');
const { validateToken } = require('../middlewares/validateJWT');

const postRouter = express.Router();

postRouter.get('/', validateToken, postController.getAllPosts);
postRouter.get('/search', validateToken, postController.getPostByQuery);
postRouter.get('/:id', validateToken, postController.getPostById);
postRouter.post('/', validateToken, postController.createPost);
postRouter.put('/:id', validateToken, postController.updatePostById);
postRouter.delete('/:id', validateToken, postController.deletePostById);

module.exports = postRouter;