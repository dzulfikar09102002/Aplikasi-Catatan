const express = require('express');
const { getUser, register, login, refreshToken, logout } = require('../controllers/users');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/getUser', verifyToken, getUser);
router.post('/register', register);
router.post('/login', login);
router.get('/refreshToken', refreshToken);
router.delete('/logout', logout);

module.exports = router;
