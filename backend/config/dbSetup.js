const sequelize = require('./database');
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Interview = require('../models/Interview');

// Define associations
User.hasMany(Application, { foreignKey: 'user_id' });
Application.belongsTo(User, { foreignKey: 'user_id' });

Job.hasMany(Application, { foreignKey: 'job_id' });
Application.belongsTo(Job, { foreignKey: 'job_id' });

Application.hasMany(Interview, { foreignKey: 'application_id' });
Interview.belongsTo(Application, { foreignKey: 'application_id' });

const initializeDatabase = async () => {
  try {
    console.log('Syncing database...');
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully!');
    
    // Create default admin user
    const [adminUser, created] = await User.findOrCreate({
      where: { email: 'admin@jobtracker.com' },
      defaults: {
        name: 'Admin User',
        email: 'admin@jobtracker.com',
        password: 'admin123', // Change this in production
        role: 'Admin',
      },
    });

    if (created) {
      console.log('✅ Default admin user created');
    } else {
      console.log('✓ Admin user already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
};

initializeDatabase();
