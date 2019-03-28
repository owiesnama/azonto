const express = require('express');
const router = express.Router();

const messagesController = require('../controller/messages');
const usersController = require('../controller/users');
const authController = require('../controller/auth');


router.route('/login')
  .get((req, response) => {
    response.render('admin/login');
  });


router.route('/requests')
  .get(authController.isLoggedIn,
    (req, response, next) => {
      const permission = ac.can('' + req.session.user.role_id).readAny('admin/requests');
      if (permission.granted) {
        next();
      } else {
        response.status(403).send('unauthorized');
      }
    },
    (req, response) => {
      response.render('admin/requests');
    });

router.route('/videos')
  .get(authController.isLoggedIn,
    (req, response, next) => {
      const permission = ac.can('' + req.session.user.role_id).readAny('admin/videos');
      if (permission.granted) {
        next();
      } else {
        response.status(403).send('unauthorized');
      }
    }, (req, response) => {
      response.render('admin/videos');
    });


router.route('/messages')
  .get(authController.isLoggedIn,
    (req, response, next) => {
      const permission = ac.can('' + req.session.user.role_id).readAny('admin/messages');
      if (permission.granted) {
        next();
      } else {
        response.status(403).send('unauthorized');
      }
    },
    messagesController.list,
    (req, response) => {
      console.log(req.messages);
      response.render('admin/messages', {
        messages: req.messages
      });
    });

// checks that the session is set for the bellow APIs, and the user is Authorized 
router.use(authController.isLoggedIn,
  (req, response, next) => {
    const permission = ac.can('' + req.session.user.role_id).readAny('admin');
    if (permission.granted) {
      next();
    } else {
      response.status(403).send('unauthorized');
    }
  });

router.route('/')
  .get((req, response) => {
    response.render('admin/index');
  });

router.route('/users')
  .get(usersController.list, (req, response) => {
    response.render('admin/users', {
      users: req.users
    });
  });

module.exports = router;