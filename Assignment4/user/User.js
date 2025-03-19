const { sequelize, DataTypes } = require('../database');

const User = sequelize.define(
  'User',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  }
);

module.exports = User;