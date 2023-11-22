const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user-model');

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Token.sync({ force: false }).then(() => console.log('Token table created'));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = Token;
