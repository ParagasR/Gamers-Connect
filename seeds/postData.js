const { Post } = require('../models');

const postData = [
    {
        title: 'title 1',
        content: 'This is post 1',
        user_id: 1,
        game_id: 1,
    },
    {
        title: 'title 2',
        content: 'This is post 2',
        user_id: 2,
        game_id: 2,
    },
    {
        title: 'title 3',
        content: 'This is post 3',
        user_id: 3,
        game_id: 3,
    },
    {
        title: 'title 4',
        content: 'This is post 4',
        user_id: 4,
        game_id: 4,
    },
    {
        title: 'title 5',
        content: 'This is post 5',
        user_id: 4,
        game_id: 5,
    },
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;