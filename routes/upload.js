// TODO: remove if not used
const express = require('express');
const router = express.Router();

const path = require('path');

const videosController = require('../controller/videos');
const uploaderController = require('../controller/upload');
const screenshot = require('../libs/screenshot');

router.route('/')
  .post(uploaderController.upload,
    videosController.create,
    (req, response) => {
      response.redirect('/home');
    }
  )

router.route('/get/:url')
  .get((req, response) => {
    response.download(path.join(__dirname, '../uploads/' + req.params.url));
  })

module.exports = router;