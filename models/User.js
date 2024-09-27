const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(offeredPassword){
    return bcrypt.compareSync(offeredPassword, this.password);
  }

  encryptPassword(password){
    return bcrypt.hashSync(password, 10)
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [6]
    }
  },
  {
    hooks: {
      // Before record creation, hash User.password value
      beforeCreate: async (newUserData) => {
        // Encrypt password
        newUserData.password = this.encryptPassword(newUserData.password);
        return newUserData;
      },
      // Before record update
      beforeSave: async (newUserData) => {
        
        // Check if password changed 
        if(newUserData.changed('password')){
          // Check if new password does not match existing password (after decryption check)
          if(this.checkPassword(newUserData.password)){
            // If so, encrypt password
            newUserData.password = this.encryptPassword(password, 10);
          }
        }
        return newUserData.password; 
      }
    },
    sequelize, // DB connection instance (from import) 
    timestamps: false, 
    freezeTableName: true, // Assures modelName is name of table in sql
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;