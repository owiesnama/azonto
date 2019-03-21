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

module.exports = router;