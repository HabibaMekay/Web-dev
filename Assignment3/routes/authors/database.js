const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'postgres', 
  password: 'postgres',
  host: 'localhost',
  port: 5432,});

module.exports = { sequelize, DataTypes }; 