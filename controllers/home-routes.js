const router = require('express').Router();
const { User, Post, Comment, Game, Profile } = require('../models');

const withAuth = require('../utils/auth');

//TODO:
//replace all tempHandlebarFile with proper handlebar files

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username']
      },
      { model: Game }],
    });

    const allGames = await Game.findAll()

    const games = allGames.map((game) => game.get({ plain: true }))
    const posts = allPosts.map((post) => post.get({ plain: true }))
    console.log(posts)
    res.render('post', { posts, games, loggedIn: req.session.loggedIn })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//get all posts from the game
router.get('/search/:title', async (req, res) => {
  try {
    const game = req.params.title.split('-').join(' ')

    const gameData = await Game.findOne({
      where: {
        title: game,
      }
    });

    if (gameData === null) {
      console.log('no game found')
      res.redirect('/');
      return
    }

    const allPosts = await Post.findAll({
      include: {
        model: User, Game,
        attributes: ['username']
      },
      where: {
        game_id: gameData.get({ plain: true }).id
      }
    });

    const allGames = await Game.findAll()

    const games = allGames.map((game) => game.get({ plain: true }))
    const posts = allPosts.map((post) => post.get({ plain: true }))
    if (req.session.loggedIn) {
      res.render('post', { posts, games, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
    } else {
      res.render('post', { posts, games })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//get single post with all comments
router.get('/posts/:id', async (req, res) => {
  try {
    const postDetails = await Post.findByPk(req.params.id, {
      include: [{
        model: Comment,
        attributes: ['comment', 'createdAt'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }]
    });
    const post = postDetails.get({ plain: true })
    req.session.currentPost = req.params.id;
    res.render('postWithComments', { post, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//get all posts by a user
// add it withAuth and req.session.loggedUser
router.get('/profile', withAuth, async (req, res) => {
  try {
    //change this back req.session.loggedUser
    const dbUserData = await User.findByPk(req.session.loggedUser, {
      include: [{
        model: Post,
      },
      { model: Profile }]
    });
    user = dbUserData.get({ plain: true })
    console.log(user)
    res.render('dashboard', { user, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
  } catch (err) {
    console.log(err)
    const userWithoutPosts = await User.findByPk(req.session.loggedUser, {
      include: {
        model: Profile
      }
    });
    if (!userWithoutPosts) {
      res.status(404).json('user doesnt exist')
    }
    user = userWithoutPosts.get({ plain: true })
    console.log(user)
    res.render('dashboard', { user, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
  }
})

router.get('/edit/:id', async (req, res) => {
  try {
    const postDetails = await Post.findByPk(req.params.id);
    const post = postDetails.get({ plain: true })
    res.status(200).json(post)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  } else {
    res.render('login');
  }
})

module.exports = router;