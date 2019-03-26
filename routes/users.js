const express = require('express');
const router = express.Router();

const usersController = require('../controller/users');
// const authController = require('../controller/auth');

// list && create API
router.route('/')
  .get(usersController.list,
    (req, response) => {
      response.render('admin/users');
      // response.status(200).send(req.users);
    })
  .post(usersController.create,
    (req, response) => {
      response.send({
          user:req.user
      });
    });

// update API
router.route('/:user_id')
  .put(usersController.update,
    (req, response) => {
      response.sendStatus(200);
    })

router.route('/login')
  .post(usersController.login,
    (req, response) => {
      response.redirect('/admin');
    });

router.route('/logout')
  .get(usersController.logout);

module.exports = router;