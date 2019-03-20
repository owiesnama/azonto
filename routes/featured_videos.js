const express = require('express');
const router = express.Router();

const featuredVideosController = require('../controller/featured_videos');
// const authController = require('../controller/auth');

// list && create API
router.route('/')
  .get(featuredVideosController.list,
    (req, response) => {
      response.status(200).send(req.featuredVideos);
    })
  .post(
    featuredVideosController.create,
    (req, response) => {
      response.redirect('/featured_videos');
    });

// delete API
router.route('/:featured_video_id')
  .delete(featuredVideosController.delete,
    (req, response) => {
      response.sendStatus(200);
    })

module.exports = router;