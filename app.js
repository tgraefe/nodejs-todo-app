const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const todoRoutes = require('./routes/todo')

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')))
app.use(bodyParser.urlencoded({ extended: false }));

app.use(todoRoutes);

app.listen(process.env.PORT, ()=>{
    console.log('Up and running');
})