const express = require('express');
const router = express.Router();

const messagesController = require('../controller/messages');
const authController = require('../controller/auth');

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

// checks that the session is set for the bellow APIs 
router.use(authController.isLoggedIn);

// delete API
router.route('/:message_id')
  .delete((req, response, next) => {
      const permission = ac.can('' + req.session.user.role_id).deleteAny('messages');
      if (permission.granted) {
        next();
      } else {
        response.status(403).send('unauthorized');
      }
    },
    messagesController.delete,
    (req, response) => {
      response.sendStatus(200);
    });

module.exports = router;