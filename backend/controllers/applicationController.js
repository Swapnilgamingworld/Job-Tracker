const { Application, Job, User } = require('../models');

// Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const applications = await Application.findAndCountAll({
      include: [
        { model: Job, attributes: ['id', 'title', 'department'] },
        { model: User, attributes: ['id', 'name', 'email'] },
      ],
      limit: parseInt(limit),
      offset: offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      data: applications.rows,
      totalPages: Math.ceil(applications.count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [
        { model: Job, attributes: ['id', 'title', 'department'] },
        { model: User, attributes: ['id', 'name', 'email'] },
      ],
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create application
exports.createApplication = async (req, res) => {
  try {
    const { user_id, job_id, resume_link } = req.body;

    if (!user_id || !job_id) {
      return res.status(400).json({ error: 'user_id and job_id are required' });
    }

    // Check if job exists
    const job = await Job.findByPk(job_id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if user already applied for this job
    const existingApp = await Application.findOne({ where: { user_id, job_id } });
    if (existingApp) {
      return res.status(400).json({ error: 'User has already applied for this job' });
    }

    const application = await Application.create({
      user_id,
      job_id,
      resume_link,
      status: 'Applied',
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update application status
exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    await application.update({ status });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
