const express = require('express');
const watermark = require('../libs/watermark');

const router = express.Router();
const fs = require('fs');

const videoPath = __dirname + '/../uploads/videos/';
const screenshotPath = __dirname + '/../uploads/thumbnails/';

const videosController = require('../controller/videos');
const uploadController = require('../controller/upload');
const screenshotLib = require('../libs/screenshot');
// const authController = require('../controller/auth');

// list && create API
router.route('/')
    .get(videosController.list,
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

router.route('/requests')
    .get(videosController.pending,
        (req, response) => {
            response.render('admin/requests', {
                videos: req.videos
            });
        });

// find one & update API
router.route('/:video_id')
    .get(videosController.findOne,
        (req, response) => {
            response.render('show', {
                video: req.video
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