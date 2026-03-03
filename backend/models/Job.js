const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define(
  'Job',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Open', 'Closed'),
      defaultValue: 'Open',
    },
  },
  {
    tableName: 'jobs',
    timestamps: true,
  }
);

module.exports = Job;
