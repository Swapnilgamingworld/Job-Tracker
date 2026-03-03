const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { register, login, logout } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/logout
router.post('/logout', verifyToken, logout);

module.exports = router;
