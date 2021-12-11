const router = require('express').Router();
const { Post, Comment, Game } = require('../../models');
const withAuth = require('../../utils/auth');

//TODO
//add middleware Auth

// new Post
router.post('/', withAuth, async (req, res) => {
  try {
    const [gameData, created] = await Game.findOrCreate({
      where: {
        title: req.body.game,
      }
    })

    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.comment,
      user_id: req.session.loggedUser,
      game_id: gameData.get({ plain: true }).id,
    });

    req.session.save(() => {
      res.status(204).json(newPost)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

//new Comment
router.post('/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.loggedUser,
      post_id: req.session.currentPost,
    });

    req.session.save(() => {
      res.status(204).json(newComment);
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//delete post
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.loggedUser,
      }
    });

    if (!deletePost) {
      res.status(404).json({ message: 'No post found with this id for this user' })
      return
    }

    res.status(200).json(deletePost)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//edit post
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Post.update(
      {
        title: req.body.title,
        post: req.body.post,
      },
      {
        where: {
          id: req.params.id,
        },
      });

    res.status(200).json(editPost)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;