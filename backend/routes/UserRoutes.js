const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controller/UserController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:reset_token/:user_id', resetPassword);

module.exports = router;