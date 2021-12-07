const { Comment, Post } = require('../models');

const commentData = [
    {
        comment: 'comment 1.2',
        user_id: '2',
        post_id: '1',
    },
    {
        comment: 'comment 1.3',
        user_id: '3',
        post_id: '1',
    },
    {
        comment: 'comment 1.4',
        user_id: '4',
        post_id: '1',
    },
    {
        comment: 'comment 2.1',
        user_id: '1',
        post_id: '2',
    },
    {
        comment: 'comment 2.3',
        user_id: '3',
        post_id: '2',
    },
    {
        comment: 'comment 2.4',
        user_id: '4',
        post_id: '2',
    },
    {
        comment: 'comment 3.1',
        user_id: '1',
        post_id: '3',
    },
    {
        comment: 'comment 3.2',
        user_id: '2',
        post_id: '3',
    },
    {
        comment: 'comment 3.4',
        user_id: '4',
        post_id: '3',
    },
    {
        comment: 'comment 4.1',
        user_id: '1',
        post_id: '4',
    },
    {
        comment: 'comment 4.2',
        user_id: '2',
        post_id: '4',
    },
    {
        comment: 'comment 4.3',
        user_id: '3',
        post_id: '4',
    },
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;