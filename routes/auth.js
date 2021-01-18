const express = require('express');

const authController = require('../controllers/auth');

const authValidator = require('../validator/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);
router.post('/signup', authValidator.signup, authController.postSignup);

module.exports = router;
