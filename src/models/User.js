const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt=require('bcrypt');
const { NOEXPAND } = require('sequelize/lib/table-hints');
const User = sequelize.define('user', {
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
/**Esto es un hooks que es llamado por el
 * controlador create para encriptar el password
 * atravez de bcrypt y asignarlo a la propiedad
 * Ademas se emplea en el metodo beforeCreate 
 * que es de sequlize 
 */
User.beforeCreate(async(user)=>{
    const password=user.password
    const hashePassword=await bcrypt.hash(password, 10)
    user.password=hashePassword
})
User.prototype.toJSON=function(){
    const values={...this.get()};
    delete values.password;
    return values;
}


module.exports = User;