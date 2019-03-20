const express = require('express');
const router = express.Router();
const fs = require('fs');

const path = __dirname + '/../uploads/';

const videosController = require('../controller/videos');
const uploadController = require('../controller/upload');
// const authController = require('../controller/auth');

// list && create API
router.route('/')
  .get(videosController.list,
    (req, response) => {
      response.status(200).send(req.videos);
    })
  .post(
    uploadController.upload,
    videosController.create,
    (req, response) => {
      response.redirect('/videos');
    });

// update API
router.route('/:video_id')
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
        fs.unlinkSync(path + req.video.url)
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