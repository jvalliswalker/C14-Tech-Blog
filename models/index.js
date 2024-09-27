const User = require('./User');
const Post = require('./Post');

// Establish relationship between User and Post
User.hasMany(Post);
Post.belongsTo(User);

module.exports = { User, Post }