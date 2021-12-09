const router = require('express').Router();
const userRoute = require('./user-routes');
const postRoute = require('./post-routes');
const profileRoute = require('./profile-routes');

router.use('/users', userRoute);
router.use('/post', postRoute);
router.use('/profile', profileRoute);

module.exports = router;