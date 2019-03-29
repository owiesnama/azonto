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
// const authController = require('../controller/auth');

// list && create API
router.route('/')
    .get(videosController.list,
        categoriesController.list,
        (req, response) => {
            response.status(200).send(req.videos);
        })
    .post(
        uploadController.upload,
        screenshotLib.takeScreenshot,
        // watermark.generateWatermark,
        videosController.create,
        (req, response) => {
            response.redirect('/');
        });

router.route('/trending')
    .get(videosController.trending,
        (req, response) => {
            response.status(200).send(req.videos);
        })

router.route('/recommended/:category_id')
    .get(videosController.recommended,
        (req, response) => {
            response.status(200).send(req.videos);
        })

router.route('/search')
    .post(videosController.search,
        (req, response) => {
            response.render('search', {
                videos: req.videos
            });
        })

router.route('/requests')
    .get(videosController.pending,
        (req, response) => {
            response.send({videos: req.videos});
        });

// find one & update API
router.route('/:video_id')
    .get(videosController.findOne,
        categoriesController.list,
        (req, response) => {
            response.render('show', {
                video: req.video,
                categories: req.categories
            });
        })
    .put(videosController.update,
        (req, response) => {
            response.sendStatus(200);
        })

// delete API
router.route('/:video_id')
    .delete(videosController.findOne,
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