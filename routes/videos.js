const express = require('express');
const router = express.Router();

const videosController = require('../controller/videos');
// const authController = require('../controller/auth');

// list && create API
router.route('/')
  .get(videosController.list,
    (req, response) => {
      response.status(200).send(req.videos);
    })
  .post(videosController.create,
    (req, response) => {
      response.redirect('/videos');
    });

// update API
router.route('/:video_id')
  .put(videosController.update,
    (req, response) => {
      response.sendStatus(200);
    })

module.exports = router;