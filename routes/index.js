const express = require('express');
const videosController = require('../controller/videos');

const router = express.Router();

// const attachmentsController = require('../controller/attachments');

router.get('/',
    videosController.list,
    videosController.trending,
    (req, response) => {
        response.render('home', {
            videos: req.videos,
            trending: req.trending
        });
    });

router.get('/contact',
    (req, response) => {
        response.render('contact_us');
    });
router.get('/upload',
    (req, response) => {
        response.render('create');
    });
router.get('/privacy',
    (req, response) => {
        response.render('privacy');
    });

router.get('/terms',
    (req, response) => {
        response.render('terms');
    });

router.get('/thanks',
    (req, response) => {
        response.render('contact-thanks');
    });

module.exports = router;