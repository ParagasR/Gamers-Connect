const router = require('express').Router();
const userRoute = require('./user-routes');
const postRoute = require('./post-routes')

router.use('/users', userRoute);
router.user('/post', postRoute);

module.exports = router;