const { User, Application } = require('../models');
const sequelize = require('sequelize');

// Get all candidates (Recruiter/Admin view)
exports.getAllCandidates = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const candidates = await User.findAndCountAll({
      where: { role: 'Candidate' },
      attributes: ['id', 'name', 'email', 'createdAt'],
      include: [
        {
          model: Application,
          as: 'applications',
          attributes: ['id'],
          required: false,
        },
      ],
      limit: parseInt(limit),
      offset: offset,
      order: [['createdAt', 'DESC']],
    });

    // Add application count to each candidate
    const data = candidates.rows.map((candidate) => ({
      ...candidate.toJSON(),
      applicationCount: candidate.applications.length,
    }));

    res.json({
      data,
      totalPages: Math.ceil(candidates.count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await User.findOne({
      where: { id: req.params.id, role: 'Candidate' },
      attributes: ['id', 'name', 'email', 'createdAt'],
      include: [
        {
          model: Application,
          as: 'applications',
          attributes: ['id', 'status', 'createdAt'],
          required: false,
        },
      ],
    });

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json({
      ...candidate.toJSON(),
      applicationCount: candidate.applications.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update candidate info
exports.updateCandidate = async (req, res) => {
  try {
    const candidate = await User.findOne({
      where: { id: req.params.id, role: 'Candidate' },
    });

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    const { name, email } = req.body;
    await candidate.update({
      name: name || candidate.name,
      email: email || candidate.email,
    });

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
