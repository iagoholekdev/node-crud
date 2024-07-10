const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('***', '*****', '****', {
    host: '****',
    dialect: '***'
});


module.exports = sequelize;