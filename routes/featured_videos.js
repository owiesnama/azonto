const express = require('express');
const router = express.Router();

const featuredVideosController = require('../controller/featured_videos');
const authController = require('../controller/auth');

// list && create API
router.route('/')
    .get(featuredVideosController.list,
        (req, response) => {
            response.status(200).send({
                featured: req.featuredVideos
            });
        })
    .post(authController.isLoggedIn,
        (req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).createAny('featured_videos');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        featuredVideosController.create,
        (req, response) => {
            response.send({
                featured: req.featured
            });
        });

// update videos order API
router.route('/update_order')
    .put(authController.isLoggedIn,
        (req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).createAny('featured_videos');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        featuredVideosController.updateOrder,
        (req, response) => {
            response.redirect('/featured_videos');
        });

// delete API
router.route('/:featured_video_id')
    .delete(authController.isLoggedIn,
        (req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).deleteAny('featured_videos');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        featuredVideosController.delete,
        (req, response) => {
            response.sendStatus(200);
        })

module.exports = router;