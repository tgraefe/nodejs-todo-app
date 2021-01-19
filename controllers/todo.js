const mongoose = require('mongoose');

const Todo = require('../models/todo');
const User = require('../models/user');

exports.getIndex = (req, res, next) => {
    Todo.find()
    .then(todos => {
        res.render('index', {
            title: 'Todos',
            username: req.session.user.username,
            membershipLevel: 'Pro User',
            todos: todos
        });
    })
};

exports.getAddTodo = (req, res, next) => {
    res.render('todos/add-todo', {
        title: 'Add todo',
        username: req.session.user.username,
        membershipLevel: 'Pro User',
        errorMessage: null
    })
}

exports.postAddTodo = (req, res, next) => {
    const title = req.body.title;
    const details = req.body.details;

    const todo = new Todo({
        title: title,
        details: details,
        userId: req.user._id,
        dueDate: Date.now() + (3600 * 24)
    })
    
    todo.save().then((t) => {
        req.user.todos.push({todoId: new mongoose.Types.ObjectId(t._id)});
        return req.user.save();
    })
    .then(() => {
        return res.redirect('/');
    })
    .catch(err => console.log(err))
}