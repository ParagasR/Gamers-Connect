const router = require('express').Router();

const { User, Post, Profile } = require('../../models');
const withAuth = require('../../utils/auth');
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dfdi3vuvy', 
    api_key: '864399935628754', 
    api_secret: 'IIjTkIv75REFCPTnO5gCopjjPfU' 
  });


const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();

// Do I need to get all profiles?
router.get('/', async (req, res) => {
    try {
        const profileData = await Profile.findAll({
            include: [
                {
                  model: User,
                  attributes: ['name'],
                },
              ],
        });

        const profiles = profileData.map((profile) => profile.get({ plain: true }));

        res.render('/test.html', { 
            profiles, 
            loggedIn: req.session.loggedIn
          });
    } catch (err) {
        res.status(500).json(err);
    }
});

//  Get profile by id
router.get('/:id', withAuth, async (req, res) => {
    try{
        const userProfile = await Profile.findByPk(req.params.id, {
            attributes: [
                'id',
                'user_bio',
                'favorite_games',
                'image_url',
            ],
            include: [
                {
                    model: Post
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        const profile = userProfile.get({ plain: true });
        res.render('profile', {
            profile,
            loggedIn: req.session.loggedIn,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update profile, maybe one just for picture

// Create profile
router.post('/', upload.single('image_url'), function (req, res, next) {
    console.log(req.body, req.file);
  return cloudinary.uploader.upload(req.file.path)
    // .then((data) => {
    //     console.log(data);
    // })
    .then((data) => {
        console.log(data);
        Profile.create({
            user_bio: req.body.user_bio,
            favorite_games: req.body.favorite_games,
            image_url: data.url
        },
        // {
        // include: [
        //     {
        //         model: Post,
        //     },
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }

        // ]
        )
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
        return res.redirect('/test.html')
    }).catch((err) => res.status(500).json(err));
});

// Delete Profile?
module.exports = router;