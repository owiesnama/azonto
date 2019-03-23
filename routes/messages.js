const express = require('express');
const router = express.Router();

const messagesController = require('../controller/messages');
// const authController = require('../controller/auth');

// list && create API
router.route('/')
  .get(messagesController.list,
    (req, response) => {
      response.status(200).send(req.messages);
    })
  .post(
    messagesController.create,
    (req, response) => {
      response.redirect('/');
    });

// update API
router.route('/:message_id')
  .put(messagesController.update,
    (req, response) => {
      response.sendStatus(200);
    });

// delete API
router.route('/:message_id')
  .delete(messagesController.delete,
    (req, response) => {
      response.sendStatus(200);
    });

module.exports = router;