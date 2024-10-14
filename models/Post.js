const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [2]
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [2]
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: async (newPostData) => {
        newPostData.created_date = new Date();
        return newPostData;
      }
    },
    sequelize, // DB connection instance (from import) 
    timestamps: false, 
    freezeTableName: true, // Assures modelName is name of table in sql
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;