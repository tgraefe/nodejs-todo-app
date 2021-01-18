const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        title: 'Login',
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        title: 'Signup',
    });
};

exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword,
            });

            user.save();
            res.redirect('/');
        })
        .catch((err) => console.log(err));
};
