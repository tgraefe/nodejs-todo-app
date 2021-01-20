const mongoose = require('mongoose');

const Todo = require('../models/todo');

exports.getStats = (req, res, next) => {
    req.user.populate('todos.todoId').execPopulate()
    .then(user => {

        res.render('user/stats', {
            title: 'Stats',
            username: req.session.user.username,
            membershipLevel: 'Pro User',
            finished: req.user.stats.finishedCnt
        });
    })
};
