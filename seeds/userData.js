const { User, Profile } = require('../models');

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

const profileData = [
  {
    user_id: 1,
  },
  {
    user_id: 2,
  },
  {
    user_id: 3,
  },
  {
    user_id: 4,
  },
]

const seedUser = () => User.bulkCreate(userData);
const seedProfile = () => Profile.bulkCreate(profileData)

module.exports = { seedUser, seedProfile };