const express = require('express');
const { userController } = require('../controllers/index');
const { validateToken } = require('../middlewares/validateJWT');

const routerUser = express.Router();

routerUser.post('/', userController.createUser);
routerUser.get('/', validateToken, userController.getAllUsers);

module.exports = routerUser;