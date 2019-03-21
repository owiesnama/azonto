const express = require('express');
const router = express.Router();

// const attachmentsController = require('../controller/attachments');

router.get('/',
  (req, response) => {
    response.render('home');
  });

module.exports = router;