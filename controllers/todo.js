const mongoose = require('mongoose');

const Todo = require('../models/todo');

exports.getIndex = (req, res, next) => {
    req.user.populate('todos.todoId').execPopulate()
    .then(user => {

        res.render('index', {
            title: 'Todos',
            username: req.session.user.username,
            membershipLevel: 'Pro User',
            todos: user.todos
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
        dueDate: Date.now() + (3600000 * 24)
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

exports.postFinishedTodo = (req, res, next) => {
    const todoId = req.params.todoId;
    Todo.findById(todoId)
    .then(t => {
        const finishedTodos = [...req.user.stats.finishedTodos]
        finishedTodos.push(t);
        const userTodos = [...req.user.todos];
        const currentTodos = userTodos.filter(todo => todo.todoId.toString() !== todoId.toString());
        const finishedCnt = req.user.stats.finishedCnt + 1;
        let inTime = req.user.stats.inTime;
        if(Date.now() < t.dueDate) inTime++;
        
        req.user.todos = currentTodos;
        req.user.stats.finishedCnt = finishedCnt;
        req.user.stats.finishedTodos = finishedTodos;
        req.user.stats.inTime = inTime;

        return req.user.save();
    })
    .then(() => {
        return res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.postDeleteTodo = (req, res, next) => {
    const todoId = req.params.todoId;
    
    const userTodos = [...req.user.todos];
    const newTodos = userTodos.filter(todo => todo.todoId.toString() !== todoId.toString());
    req.user.todos = newTodos;
    req.user.save()
    .then(() => {
        return Todo.findByIdAndDelete(todoId);
    })
    .then(() => {
        return res.redirect('/');
    })
    .catch(err => console.log(err));
}