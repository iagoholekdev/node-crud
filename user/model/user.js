// user/model/user.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); 

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'User'
});

User.beforeCreate((user, options) => {
 
    if (!user.firstName || !user.lastName || !user.email) {
        throw new Error('Todos os campos (firstName, lastName, email) são obrigatórios');
    }

});

module.exports = User;
