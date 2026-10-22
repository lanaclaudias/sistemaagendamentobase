const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistemaagendamento', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false,
});

module.exports = sequelize;