const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
} = require('../controllers/applicationController');

// GET /api/applications - Get applications
router.get('/', verifyToken, getAllApplications);

// POST /api/applications - Apply for a job
router.post('/', verifyToken, checkRole(['Candidate']), createApplication);

// GET /api/applications/:id - Get application details
router.get('/:id', verifyToken, getApplicationById);

// PUT /api/applications/:id - Update application status (Recruiter/Admin only)
router.put('/:id', verifyToken, checkRole(['Admin', 'Recruiter']), updateApplication);

module.exports = router;
