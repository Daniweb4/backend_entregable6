const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
//Iduser
//Idproduct

module.exports = Cart;