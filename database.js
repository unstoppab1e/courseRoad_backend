const { Sequelize } = require('sequelize');
const { DB_NAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize('postgres', 'postgres', DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
