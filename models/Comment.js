const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [2]
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: 'id'
      }
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
    sequelize, // DB connection instance (from import) 
    timestamps: false, 
    freezeTableName: true, // Assures modelName is name of table in sql
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;