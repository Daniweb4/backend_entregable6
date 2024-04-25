const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchase = sequelize.define('purchase', {
    quatity: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
//ProductId
//UserId

module.exports = Purchase;