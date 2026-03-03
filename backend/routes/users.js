const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// GET /api/users - Get all users (Admin only)
router.get('/', verifyToken, checkRole(['Admin']), getAllUsers);

// POST /api/users - Create a new user (Admin only)
router.post('/', verifyToken, checkRole(['Admin']), createUser);

// GET /api/users/:id - Get user profile
router.get('/:id', verifyToken, getUserById);

// PUT /api/users/:id - Update user profile
router.put('/:id', verifyToken, updateUser);

// DELETE /api/users/:id - Delete user (Admin only)
router.delete('/:id', verifyToken, checkRole(['Admin']), deleteUser);

module.exports = router;
