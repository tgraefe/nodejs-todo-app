const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');


require('dotenv').config();

const User = require('./models/user');

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const app = express();

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
})

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(csrfProtection);

app.use((req, res, next) => {
    if(!req.session.user) return next();
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
})
app.use((req, res, next) => {
    res.locals.isAuthenticated  = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use(authRoutes);
app.use(todoRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(process.env.PORT, () => {
            console.log('Up and running');
        });
    })
    .catch((err) => {
        console.log(err);
    });
