const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


require('dotenv').config();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const app = express();

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
})

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
