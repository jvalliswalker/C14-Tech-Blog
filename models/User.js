const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(offeredPassword){
    return bcrypt.compareSync(offeredPassword, this.password);
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
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
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