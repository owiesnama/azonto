const express = require('express');
const router = express.Router();

const socketController = require('../controller/socket');
// const authController = require('../controller/auth');

router.route('/broadcast')
  .post(socketController.broadcast,
    (req, response) => {
      response.sendStatus(200);
      // response.redirect('/step_types');
    })

router.route('/send')
  .post(socketController.send,
    (req, response) => {
      response.sendStatus(200);
      // response.redirect('/step_types');
    })

module.exports = router;