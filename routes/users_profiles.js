const express = require('express');
const router = express.Router();

const usersProfiles = require('../controller/users_profiles');
// const authController = require('../controller/auth');

router.route('/')
  .get(usersProfiles.findOne,
    (req, response) => {
      response.render('profile', {
        user: req.user
      });
    })
  .post(usersProfiles.update,
    (req, response) => {
      response.redirect('/users_profiles');
    })

module.exports = router;