const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'postgres', 
  password: 'postgres',
  host: 'localhost',
  port: 5432,});

module.exports = { sequelize, DataTypes }; 


// ORM->	Tables with rows and columns.	              (Object-Relational Mapping)
// ODM -> Collections with JSON-like documents.       (Object-Document Mapping)