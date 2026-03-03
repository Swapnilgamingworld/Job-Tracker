const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Interview = sequelize.define(
  'Interview',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    interview_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    interview_type: {
      type: DataTypes.STRING,
      defaultValue: 'Phone',
    },
    feedback: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'interviews',
    timestamps: true,
  }
);

module.exports = Interview;
