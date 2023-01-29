const express = require('express');
const { userController } = require('../controllers/index');

const routerUSer = express.Router();

routerUSer.post('/', userController.createUser);

module.exports = routerUSer;