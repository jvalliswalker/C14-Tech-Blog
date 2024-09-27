const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Establish relationship between User and Post
Post.belongsTo(User);
User.hasMany(Post);

// Establish relationship between Comment and Post
Comment.belongsTo(Post);
Post.hasMany(Comment);

// Establish relationship between Comment and User
Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = { User, Post, Comment }