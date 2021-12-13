const router = require('express').Router();
const { User, Profile } = require('../../models');
const withAuth = require('../../utils/auth')

//TODO
//check out create user to make sure all proper data is being sent over to create the user

//logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrent pairing of Username and Password. Please try again' });
      return;
    }

    const checkPassword = await dbUserData.checkPassword(req.body.password);

    if (!checkPassword) {
      res.status(400).json({ message: 'Incorrent pairing of Username and Password. Please try again' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.loggedUser = dbUserData.id;
      console.log(req.session.cookie);
      res.status(200).json({ user: dbUserData, message: 'Login Successful' });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

//create user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    const profileData = await Profile.create({
      user_id: dbUserData.id,
    })

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.loggedUser = dbUserData.id;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});


module.exports = router;