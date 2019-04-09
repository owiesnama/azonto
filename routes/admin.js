const express = require('express');
const countController = require('../controller/count');

const router = express.Router();

const messagesController = require('../controller/messages');
const usersController = require('../controller/users');
const authController = require('../controller/auth');
const videosController = require('../controller/videos');
const uploadController = require('../controller/upload');
const screenshotLib = require('../libs/screenshot');

router.route('/login')
    .get((req, response) => {
        response.render('admin/login');
    });


router.route('/requests')
    .get(authController.isLoggedIn,
        (req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).readAny('admin/requests');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        (req, response) => {
            response.render('admin/requests');
        });

// uploading routes
router.route('/upload')
    .post(authController.isLoggedIn,
        (req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).createAny('admin/upload');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        uploadController.upload,
        screenshotLib.takeScreenshot,
        videosController.createUploadByAdmin,
        (req, response) => {
            response.render('admin/videos');
        });

router.route('/YouTube')
    .post(authController.isLoggedIn,
        (req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).createAny('admin/YouTube');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        videosController.createYoutubeByAdmin,
        (req, response) => {
            response.render('admin/videos');
        });

router.route('/videos')
    .get(authController.isLoggedIn,
        (req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).readAny('admin/videos');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        }, (req, response) => {
            response.render('admin/videos');
        });


router.route('/messages')
    .get(authController.isLoggedIn,
        (req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).readAny('admin/messages');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        messagesController.list,
        (req, response) => {
            console.log(req.messages);
            response.render('admin/messages', {
                messages: req.messages
            });
        });

// checks that the session is set for the bellow APIs, and the user is Authorized
router.use(authController.isLoggedIn,
    (req, response, next) => {
        const permission = ac.can('' + req.session.user.role_id).readAny('admin');
        if (permission.granted) {
            next();
        } else {
            response.status(403).send('unauthorized');
        }
    });

router.route('/')
    .get(countController.count,
        (req, response) => {
            response.render('admin/index', {
                counts: req.counts
            });
        });

router.route('/users')
    .get(usersController.list, (req, response) => {
        response.render('admin/users', {
            users: req.users
        });
    });
router.route('/videos')
    .get((req, response) => {
        response.render('admin/videos');
    });

router.route('/categories')
    .get((req, response) => {
        response.render('admin/categories');
    });

router.route('/featured')
    .get((req, response) => {
        response.render('admin/featured');
    });

router.route('/sponsored')
    .get((req, response) => {
        response.render('admin/sponsored');
    });

router.route('/login')
    .get((req, response) => {
        response.render('admin/login');
    });
module.exports = router;