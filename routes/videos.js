const express = require('express');
const router = express.Router();
const fs = require('fs');

const videoPath = __dirname + '/../uploads/videos/';
const screenshotPath = __dirname + '/../uploads/thumbnails/';

const watermark = require('../libs/watermark');
const categoriesController = require('../controller/categories');
const videosController = require('../controller/videos');
const uploadController = require('../controller/upload');
const screenshotLib = require('../libs/screenshot');
const authController = require('../controller/auth');

// list && create API
router.route('/')
    .get(videosController.list,
        categoriesController.list,
        (req, response) => {
            response.status(200).send({
                videos: req.videos,
                pages: req.pages,
                pageNumber: req.pageNumber
            });
        });

router.route('/upload')
    .post(uploadController.upload,
        screenshotLib.takeScreenshot,
        // watermark.generateWatermark,
        videosController.createUpload,
        (req, response) => {
            response.redirect('/');
        });

router.route('/youtube')
    .post(videosController.createYoutube,
        (req, response) => {
            response.redirect('/');
        });

router.route('/trending')
    .get(videosController.trending,
        (req, response) => {
            response.status(200).send({
                videos: req.videos,
                pages: req.pages
            });
        })

router.route('/recommended/:category_id')
    .get(videosController.recommended,
        (req, response) => {
            response.status(200).send({
                videos: req.videos,
                pages: req.pages
            });
        })

router.route('/search')
    .get(videosController.search,
        (req, response) => {
            response.status(200).send({
                videos: req.videos,
                pages: req.pages
            });
        })


// find one & update API
router.route('/:video_id')
    .get(videosController.findOne,
        categoriesController.list,
        videosController.trending,
        (req, response) => {
            response.render('show', {
                video: req.video,
                categories: req.categories,
                trending: req.trending
            });
        })
    .put((req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).updateAny('videos');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        }, videosController.update,
        (req, response) => {
            response.sendStatus(200);
        })

// checks that the session is set for the bellow APIs
router.use(authController.isLoggedIn);

router.route('/requests')
    .get((req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).readAny('videos');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        videosController.pending,
        (req, response) => {
            response.render('admin/requests', {
                videos: req.videos
            });
        });

// delete API
router.route('/:video_id')
    .delete((req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).deleteAny('videos');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        videosController.findOne,
        // deleting the file from uploads folder
        (req, response, next) => {
            try {
                fs.unlinkSync(videoPath + req.video.url)
                fs.unlinkSync(screenshotPath + req.video.thumbnail)
                next();
            } catch (error) {
                response.status(500).send(error);
            }
        },
        videosController.delete,
        (req, response) => {
            response.sendStatus(200);
        })

module.exports = router;