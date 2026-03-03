const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');

// Import models
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');
const Interview = require('./models/Interview');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define model associations
User.hasMany(Application, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'user_id' });

Job.hasMany(Application, { foreignKey: 'job_id', onDelete: 'CASCADE' });
Application.belongsTo(Job, { foreignKey: 'job_id' });

Application.hasMany(Interview, { foreignKey: 'application_id', onDelete: 'CASCADE' });
Interview.belongsTo(Application, { foreignKey: 'application_id' });

// Database connection and sync
const startServer = async () => {
  try {
    await db.authenticate();
    console.log('✓ Database connected');
    
    await db.sync({ force: false, alter: true });
    console.log('✓ Database tables synced');

    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.json({ status: 'Server is running', timestamp: new Date() });
    });

    // Debug endpoint to check database
    app.get('/api/debug/users', async (req, res) => {
      try {
        const { User } = require('./models');
        const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
        res.json({ count: users.length, users });
      } catch (error) {
        res.json({ error: error.message });
      }
    });

    // Routes - Register after database sync
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/jobs', require('./routes/jobs'));
    app.use('/api/candidates', require('./routes/candidates'));
    app.use('/api/applications', require('./routes/applications'));
    app.use('/api/interviews', require('./routes/interviews'));
    app.use('/api/users', require('./routes/users'));

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
      });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database Error:', err);
    process.exit(1);
  }
};

startServer();

