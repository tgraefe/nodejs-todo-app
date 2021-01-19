const express = require('express');

const todoController = require('../controllers/todo');

const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/', isAuth ,todoController.getIndex);

router.get('/add-todo', isAuth, todoController.getAddTodo)
router.post('/add-todo', isAuth, todoController.postAddTodo);

module.exports = router;
