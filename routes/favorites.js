const express = require('express');
const router = express.Router();

const favoritesController = require('../controller/favorites');
// const authController = require('../controller/auth');

router.route('/')
  .get(favoritesController.list,
    (req, response) => {
      response.status(200).send(req.stepTypes);
    })
  .post(favoritesController.create,
    (req, response) => {
      response.redirect('/favorites');
    })

router.route('/edit/:favorite_id')
  .post(favoritesController.update,
    (req, response) => {
      response.redirect('/favorites');
    })

module.exports = router;