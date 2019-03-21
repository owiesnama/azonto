const express = require('express');
const router = express.Router();

// const attachmentsController = require('../controller/attachments');

router.get('/',
  (req, response) => {
    response.render('admin/login');
  });

module.exports = router;