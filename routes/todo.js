const express = require('express');

const todoController = require('../controllers/todo');

const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/', isAuth ,todoController.getIndex);

router.get('/add-todo', isAuth, todoController.getAddTodo)
router.post('/add-todo', isAuth, todoController.postAddTodo);

router.post('/finished/:todoId', isAuth, todoController.postFinishedTodo);
router.post('/delete/:todoId', isAuth, todoController.postDeleteTodo);

module.exports = router;
