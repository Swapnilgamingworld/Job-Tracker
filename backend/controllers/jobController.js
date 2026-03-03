const { Job } = require('../models');

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const jobs = await Job.findAndCountAll({
      where: search ? { title: { [require('sequelize').Op.iLike]: `%${search}%` } } : {},
      limit: parseInt(limit),
      offset: offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      data: jobs.rows,
      totalPages: Math.ceil(jobs.count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description, department, status } = req.body;

    if (!title || !description || !department) {
      return res.status(400).json({ error: 'Title, description, and department are required' });
    }

    const job = await Job.create({
      title,
      description,
      department,
      status: status || 'Open',
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const { title, description, department, status } = req.body;
    await job.update({
      title: title || job.title,
      description: description || job.description,
      department: department || job.department,
      status: status || job.status,
    });

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    await job.destroy();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
