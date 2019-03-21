const express = require('express');
const router = express.Router();

// const attachmentsController = require('../controller/attachments');

router.get('/',
  (req, response) => {
    response.render('admin/login');
  });

router.get('/contact',
  (req, response) => {
    response.render('contact_us');
  });
router.get('/upload',
  (req, response) => {
    response.render('create');
  });

module.exports = router;