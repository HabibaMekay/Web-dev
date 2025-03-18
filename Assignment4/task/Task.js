const { sequelize, DataTypes } = require('../database');

const Task = sequelize.define(
  'Task',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    task_duration: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  }
);

module.exports = Author;