const sequelize = require('../config/database');
const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');
const Interview = require('./Interview');

// Define associations
User.hasMany(Application, { foreignKey: 'user_id' });
Application.belongsTo(User, { foreignKey: 'user_id' });

Job.hasMany(Application, { foreignKey: 'job_id' });
Application.belongsTo(Job, { foreignKey: 'job_id' });

Application.hasMany(Interview, { foreignKey: 'application_id' });
Interview.belongsTo(Application, { foreignKey: 'application_id' });

module.exports = {
  sequelize,
  User,
  Job,
  Application,
  Interview,
};
