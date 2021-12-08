const router = require('express').Router();
const { User, Post, Comment, Game } = require('../models');
const withAuth = require('../utils/auth');

//TODO:
//replace all tempHandlebarFile with proper handlebar files

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
          attributes: ['user']
        }
      },
      {
        model: User,
        attributes: ['user']
      }]
    });
    const post = postDetails.get({ plain: true })
    req.session.currentPost = req.params.id;
    res.render('tempHandlebarFile', { post, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//get all posts by a user
router.get('/tempHandlebarFile', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.loggedUser, {
      include: {
        model: Post,
      },
      attributes: { excludes: ['password'] }
    });
    user = dbUserData.get({ plain: true })
    console.log(user)
    res.render('tempHandlebarFile', { user, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
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
    res.render('tempHandlebarFile', { user, loggedIn: req.session.loggedIn, loggedUser: req.session.loggedUser })
  }
})


module.exports = router;