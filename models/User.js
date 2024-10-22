const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(offeredPassword){
    return bcrypt.compare(offeredPassword, this.password);
  }

  static encryptPassword(password){
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
      allowNull: false,
      unique: true
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
        newUserData.password = User.encryptPassword(newUserData.password);
        return newUserData;
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