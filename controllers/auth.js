const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator/check')

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        title: 'Login',
        errorMessage: null
    });
};

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessage = errors.array()[0].msg;
        return res.render('auth/login', {
            title: 'Login',
            errorMessage: errorMessage
        })
    }

    User.findOne({username: username})
        .then(user => {
            
            if(!user){
                return res.render('auth/login', {
                    title: 'Login',
                    errorMessage: 'User not found!'
                });
            }
            bcrypt.compare(password, user.password)
            .then(doMatch => {
                if(doMatch){
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err => {
                        if(err) console.log(err)
                        return res.redirect('/')
                    })
                } else {
                    return res.render('auth/login', {
                        title: 'Login',
                        errorMessage: 'Incorrect password'
                    });
                }
            })
            .catch(err => console.log(err))

        })

}


exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        title: 'Signup',
        errorMessage: null
    });
};

exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessage = errors.array()[0].msg;
        return res.render('auth/signup', {
            title: 'Signup',
            errorMessage: errorMessage
        })
    }

    bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword,
                avatarImgUrl: '',
                todos: [],
                stats: {
                    finishedCnt: 0,
                    inTime: 0,
                    finishedTodos: []
                }
            });

            user.save();
            res.redirect('/login');
        })
        .catch((err) => console.log(err));
};


exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if(err) console.log(err);
        res.redirect('/');
    })
}