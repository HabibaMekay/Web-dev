const { sequelize, DataTypes } = require('./database');

const Author = sequelize.define(
  'Author',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  }
);

module.exports = Author;