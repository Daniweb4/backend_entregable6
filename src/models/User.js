const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('modelName', {
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
        unique:true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
    },

});

module.exports = User;