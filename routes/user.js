const express = require('express');

const userController = require('../controllers/user');

const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/stats', isAuth ,userController.getStats);

module.exports = router;
