const router = require('express').Router();

const { User, Post, Profile } = require('../../models');
const withAuth = require('../../utils/auth');

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
var type = upload.single('image_url');
require('dotenv').config();

//view other profiles
// // Do I need to get all profiles?
// router.get('/', async (req, res) => {
//     try {
//         const profileData = await Profile.findAll({
//             include: [
//                 {
//                   model: User,
//                   attributes: ['name'],
//                 },
//               ],
//         });

//         const profiles = profileData.map((profile) => profile.get({ plain: true }));

//         res.render('/test.html', { 
//             profiles, 
//             loggedIn: req.session.loggedIn
//           });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// //  Get profile by id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const userProfile = await Profile.findByPk(req.params.id, {
            attributes: [
                'id',
                'user_bio',
                'favorite_games',
                'image_url',
            ],
            // include: [
            //     {
            //         model: Post
            //     },
            //     {
            //         model: User,
            //         attributes: ['username']
            //     }
            // ]
        });
        const profile = userProfile.get({ plain: true });
        // res.render('profile', {
        //     profile,
        //     loggedIn: req.session.loggedIn,
        // })
    } catch (err) {
        res.status(500).json(err);
    }
});

// // Update profile, maybe one just for picture


// Create profile
router.post('/picture', type, async (req, res) => {
    try {
        const profileData = await cloudinary.uploader.upload(req.file.path, { secure: true, transformation: [{ width: 150, height: 150, gravity: "face", crop: "thumb" }] })

        const profile = await Profile.update(
            {
                image_url: profileData.url
            },
            {
                where: {
                    //change this back to loggedin User
                    id: 1,
                },
            })
        res.status(200).json(profile)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.post('/bio', type, async (req, res) => {
    try {
        console.log(req.body.userBio)
        const profile = await Profile.update(
            {
                user_bio: req.body.userBio,
                favorite_games: req.body.favGames,
            },
            {
                where: {
                    //change this back to loggedin User
                    id: 1,
                },
            })
        res.status(200).json(profile)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = router;