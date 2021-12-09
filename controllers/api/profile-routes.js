const router = require('express').Router();
const { User } = require('../../models');
// const withAuth = require('../../utils/auth');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();

// Update profile picture
router.put('/profile', upload.single('image_url'), function (req, res, next) {
  return cloudinary.uploader.upload(req.file.path)
    .then((data) => {
        User.update({
            image_url: data.url
        }) 
        return res.redirect('/profile')
    }).catch((err) => res.status(500).json(err));
});

module.exports = router;