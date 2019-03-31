const express = require('express');
const router = express.Router();

const categoriesController = require('../controller/categories');
const authController = require('../controller/auth');


// list && create API
router.route('/')
  .get(categoriesController.list,
    (req, response) => {
      response.status(200).send(req.categories);
    })
  .post(authController.isLoggedIn,
    (req, response, next) => {
      const permission = ac.can('' + req.session.user.role_id).createAny('categories');
      if (permission.granted) {
        next();
      } else {
        response.status(403).send('unauthorized');
      }
    },
    categoriesController.create,
    (req, response) => {
      response.status(200).send(req.category);
    });

// update API
router.route('/:category_id')
  .put(authController.isLoggedIn,
    (req, response, next) => {
      const permission = ac.can('' + req.session.user.role_id).updateAny('categories');
      if (permission.granted) {
        next();
      } else {
        response.status(403).send('unauthorized');
      }
    },
    categoriesController.update,
    (req, response) => {
      response.sendStatus(200);
    })

module.exports = router;