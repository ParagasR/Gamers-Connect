const router = require('express').Router();
const { User, Post, Comment, Game } = require('../models');

const withAuth = require('../utils/auth');

//TODO:
//replace all tempHandlebarFile with proper handlebar files

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: {
        model: User, Game,
        attributes: ['username']
      },
    });

    const posts = allPosts.map((post) => post.get({ plain: true }))
    res.render('post', { posts })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//get all posts from the game
router.get('/game/:id', async (req, res) => {
  try {
    const gamePosts = await Game.findByPk(req.params.id, {
      include: {
        model: Post,
        attributes: ['title', 'content', 'createdAt'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    })
    const game = gamePosts.get({ plain: true })
    if (req.session.loggedIn) {
      res.render('tempHandlebarFile', { game, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
    } else {
      res.render('tempHandlebarFile', { game })
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
router.get('/profile', async (req, res) => {
  try {
    //change this back req.session.loggedUser
    const dbUserData = await User.findByPk(1, {
      include: {
        model: Post,
      },
      attributes: { excludes: ['password'] }
    });
    user = dbUserData.get({ plain: true })
    console.log(user)
    res.render('dashboard', { user, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
  } catch (err) {
    console.log(err)
    const userWithoutPosts = await User.findByPk(req.session.loggedUser, {
      attributes: { exclude: ['password'] }
    });
    if (!userWithoutPosts) {
      res.status(404).json('user doesnt exist')
    }
    user = userWithoutPosts.get({ plain: true })
    console.log(user)
    res.render('dashboard', { user, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
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