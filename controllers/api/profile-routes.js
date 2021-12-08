const router = require('express').Router();
const { User, Post } = require('../../models');
// const withAuth = require('../../utils/auth');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();

//  Get user profile by id
router.get('/:id', async (req, res) => {
    try{
        const userProfile = await User.findByPk(req.params.id, {
            attributes: [
                'id',
                'user_bio',
                'image_url',
            ],
            include: [
                {
                    model: Post
                }
            ]
        });
        const profile = userProfile.get({ plain: true });
        res.render('profile', {
            profile,

        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create User Profile?
// router.put('/:id', async (req, res) => {
//     try {
//         const profileData = await User.update(req.params.id, {
//             user_bio: req.body.user_bio
//         },
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             }
//         );
//         res.status(200).json(profileData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Update profile picture
router.put('/:id', upload.single('image_url'), function (req, res, next) {
  return cloudinary.uploader.upload(req.file.path)
    .then((data) => {
        console.log(data);
        User.update({
            image_url: data.url
        },
        {
            where: {
                id: req.params.id
            }
        }
        ) 
        return res.redirect('/profile')
    }).catch((err) => res.status(500).json(err));
});

module.exports = router;