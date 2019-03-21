const express = require('express');
const router = express.Router();

const usersController = require('../controller/users');
// const authController = require('../controller/auth');

router.route('/')
  .post(usersController.create,
    (req, response) => {
      response.redirect('/login');
    });

router.route('/login')
  .post(usersController.login,
    (req, response) => {
      response.redirect('/home');
    });

router.route('/logout')
  .get(usersController.logout);

module.exports = router;