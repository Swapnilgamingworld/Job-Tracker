const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const {
  getAllInterviews,
  getInterviewById,
  createInterview,
  updateInterview,
} = require('../controllers/interviewController');

// GET /api/interviews - Get all interviews (Recruiter/Admin only)
router.get('/', verifyToken, checkRole(['Admin', 'Recruiter']), getAllInterviews);

// POST /api/interviews - Schedule an interview (Recruiter/Admin only)
router.post('/', verifyToken, checkRole(['Admin', 'Recruiter']), createInterview);

// GET /api/interviews/:id - Get interview details
router.get('/:id', verifyToken, getInterviewById);

// PUT /api/interviews/:id - Update interview (Recruiter/Admin only)
router.put('/:id', verifyToken, checkRole(['Admin', 'Recruiter']), updateInterview);

module.exports = router;
