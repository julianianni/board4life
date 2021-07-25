const {DataTypes, Model } = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../db/connection')

class User extends Model {}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  }
)

module.exports = User

User.addHook('beforeCreate', (usuario) => {
  return bcrypt.genSalt()
       .then((salt) =>{
           usuario.salt = salt;
           return bcrypt.hash(usuario.password, usuario.salt)
       })
       .then((hashed)=> usuario.password = hashed)
})

User.prototype.isValidPassword = function(password){
   return bcrypt.hash(password, this.salt)
         .then(result =>{
             return result === this.password;
       }).catch(err => console.log(err))
}