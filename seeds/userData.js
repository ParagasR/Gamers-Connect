const { User } = require('../models');

const userData = [
  {
    user: 'NinjaStep',
    password: '12345678',
    //image_url: 'default url link in cloud'
  },
  {
    user: 'Chochinibi',
    password: '12345678',
    //image_url: 'default url link in cloud'
  },
  {
    user: 'DeterminedSloth',
    password: '12345678',
    //image_url: 'default url link in cloud'
  },
  {
    user: 'Zima',
    password: '12345678',
    //image_url: 'default url link in cloud'
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;