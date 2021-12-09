const { User } = require('../models');

const userData = [
  {
    username: 'NinjaStep',
    password: '12345678',
  },
  {
    username: 'Chochinibi',
    password: '12345678',
  },
  {
    username: 'DeterminedSloth',
    password: '12345678',
  },
  {
    username: 'Zima',
    password: '12345678',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;