const { sequelize, DataTypes } = require('../database');
const User = require('../user/User'); 

const Task = sequelize.define(
  'Task',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    task_duration: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' }); 
Task.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' }); //belongs to means each task belongs to 1 user

module.exports = Task;
