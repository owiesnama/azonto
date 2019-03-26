const express = require('express');
const router = express.Router();

const categoriesController = require('../controller/categories');
// const authController = require('../controller/auth');

// list && create API
router.route('/')
  .get(categoriesController.list,
    (req, response) => {
      response.status(200).send(req.categories);
    })
  .post(categoriesController.create,
    (req, response) => {
      response.sendStatus(200);
    });

// update API
router.route('/:category_id')
  .put(categoriesController.update,
    (req, response) => {
      response.sendStatus(200);
    })

module.exports = router;