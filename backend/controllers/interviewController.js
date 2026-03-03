const { Interview, Application, User, Job } = require('../models');

// Get all interviews
exports.getAllInterviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const interviews = await Interview.findAndCountAll({
      include: [
        {
          model: Application,
          attributes: ['id', 'status'],
          include: [
            { model: Job, attributes: ['id', 'title'] },
            { model: User, attributes: ['id', 'name', 'email'] },
          ],
        },
      ],
      limit: parseInt(limit),
      offset: offset,
      order: [['interview_date', 'DESC']],
    });

    res.json({
      data: interviews.rows,
      totalPages: Math.ceil(interviews.count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get interview by ID
exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findByPk(req.params.id, {
      include: [
        {
          model: Application,
          attributes: ['id', 'status'],
          include: [
            { model: Job, attributes: ['id', 'title'] },
            { model: User, attributes: ['id', 'name', 'email'] },
          ],
        },
      ],
    });

    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create interview
exports.createInterview = async (req, res) => {
  try {
    const { application_id, interview_date, interview_type, feedback } = req.body;

    if (!application_id || !interview_date) {
      return res.status(400).json({ error: 'application_id and interview_date are required' });
    }

    // Check if application exists
    const application = await Application.findByPk(application_id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const interview = await Interview.create({
      application_id,
      interview_date,
      interview_type: interview_type || 'Phone',
      feedback: feedback || null,
    });

    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update interview
exports.updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByPk(req.params.id);
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    const { interview_date, interview_type, feedback } = req.body;
    await interview.update({
      interview_date: interview_date || interview.interview_date,
      interview_type: interview_type || interview.interview_type,
      feedback: feedback !== undefined ? feedback : interview.feedback,
    });

    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
