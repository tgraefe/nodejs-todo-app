const express = require('express');

const todoController = require('../controllers/todo');

const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/', isAuth ,todoController.getIndex);

module.exports = router;
