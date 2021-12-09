const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Game = require('./Game');
const Profile = require('./Profile');

Post.belongsTo(User, {
    foreignKey: 'user_id',
})

User.hasMany(Post, {
    foreignKey: 'user_id',
})

User.hasMany(Comment, {
    foreignKey: 'user_id',
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
})

Post.belongsTo(Game, {
    foreignKey: 'game_id'
})

Game.hasMany(Post, {
    foreignKey: 'game_id'
})

Profile.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasOne(Profile, {
    foreignKey: 'user_id'
})

module.exports = { User, Post, Comment, Game, Profile };