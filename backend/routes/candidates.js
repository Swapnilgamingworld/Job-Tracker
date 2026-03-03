const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const {
  getAllCandidates,
  getCandidateById,
  updateCandidate,
} = require('../controllers/candidateController');

// GET /api/candidates - Get all candidates (Recruiter/Admin only)
router.get('/', verifyToken, checkRole(['Admin', 'Recruiter']), getAllCandidates);

// GET /api/candidates/:id - Get candidate profile
router.get('/:id', verifyToken, getCandidateById);

// PUT /api/candidates/:id - Update candidate profile
router.put('/:id', verifyToken, updateCandidate);

module.exports = router;
