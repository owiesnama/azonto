const express = require('express');
const router = express.Router();

// const attachmentsController = require('../controller/attachments');

router.get('/',
    (req, response) => {
        response.render('home');
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