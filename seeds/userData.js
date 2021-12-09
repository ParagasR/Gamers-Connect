const { User } = require('../models');

const userData = [
  {
    username: 'NinjaStep',
    password: '12345678',
    //image_url: 'default url link in cloud'
  },
  {
    username: 'Chochinibi',
    password: '12345678',
    //image_url: 'default url link in cloud'
  },
  {
    username: 'DeterminedSloth',
    password: '12345678',
    //image_url: 'default url link in cloud'
  },
  {
    username: 'Zima',
    password: '12345678',
    //image_url: 'default url link in cloud'
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;