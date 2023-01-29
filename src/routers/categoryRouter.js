const express = require('express');
const { categoryController } = require('../controllers/index');
const { validateToken } = require('../middlewares/validateJWT');

const categoryRouter = express.Router();

categoryRouter.get('/', validateToken, categoryController.getAllCategories);
categoryRouter.post('/', validateToken, categoryController.createCategory);

module.exports = categoryRouter;