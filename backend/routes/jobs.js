const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

// GET /api/jobs - Get all jobs with pagination and filtering
router.get('/', getAllJobs);

// POST /api/jobs - Create a new job (Admin/Recruiter only)
router.post('/', verifyToken, checkRole(['Admin', 'Recruiter']), createJob);

// GET /api/jobs/:id - Get a specific job
router.get('/:id', getJobById);

// PUT /api/jobs/:id - Update a job (Admin/Recruiter only)
router.put('/:id', verifyToken, checkRole(['Admin', 'Recruiter']), updateJob);

// DELETE /api/jobs/:id - Delete a job (Admin only)
router.delete('/:id', verifyToken, checkRole(['Admin']), deleteJob);

module.exports = router;
