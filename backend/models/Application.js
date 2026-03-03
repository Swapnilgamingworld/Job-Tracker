const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define(
  'Application',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Applied', 'Interviewing', 'Offered', 'Rejected'),
      defaultValue: 'Applied',
    },
    resume_link: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'applications',
    timestamps: true,
  }
);

module.exports = Application;
