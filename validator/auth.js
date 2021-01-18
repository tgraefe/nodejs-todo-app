const { check, body } = require('express-validator');

exports.signup = [
    body('username').isAlphanumeric(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 5 }).trim(),
    body('confirmPasword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match');
            }
            return true;
        }),
];
