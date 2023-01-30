const express = require('express');
const { postController } = require('../controllers/index');
const { validateToken } = require('../middlewares/validateJWT');

const categoryRouter = express.Router();

categoryRouter.post('/', validateToken, postController.createPost);

module.exports = categoryRouter;