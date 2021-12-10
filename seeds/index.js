const sequelize = require('../config/connection');
const { seedUser, seedProfile } = require('./userData');
const seedPost = require('./postData');
const seedComment = require('./commentData');
const seedGames = require('./gameData')

const seedAll = async () => {
  await sequelize.sync({ force: true }).catch((err) => { console.log(err) });

  await seedUser().catch((err) => { console.log(err) });

  await seedProfile().catch((err) => { console.log(err) });

  await seedGames().catch((err) => { console.log(err) });

  await seedPost().catch((err) => { console.log(err) });

  await seedComment().catch((err) => { console.log(err) });

  process.exit(0);
};

seedAll();