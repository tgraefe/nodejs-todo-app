const { check, body } = require('express-validator/check');

const User = require('../models/user');

exports.signup = [
    body('username', 'Invalid username').isString().isLength({min: 3}).trim().custom(value => {
        return User.findOne({username: value}).then(userDoc => {
            if(userDoc){
                return Promise.reject('Username already exists');
            }
        })
    }),
    body('email', 'Invalid email').isEmail().normalizeEmail().custom((value) => {
        return User
        .findOne({email: value})
        .then((userDoc) => {
            if (userDoc) {
                return Promise.reject('Email already exists!');
            }
        })
    }),
    body('password', 'Password has to be at least 5 charachters long').isLength({ min: 5 }).trim(),
    body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match');
            }
            return true;
        }).withMessage("Passwords don't match"),
];


exports.login = [
    body('username', 'Invalid username').isString().isLength({min: 3}).trim(),
    body('password', 'Invalid password').isLength({min: 5}).trim()
]