const express = require('express');
const router = express.Router();

const stepTypesController = require('../controller/step_types');
// const authController = require('../controller/auth');

router.route('/')
  .get(stepTypesController.list,
    (req, response) => {
      response.status(200).send(req.stepTypes);
    })
  .post(stepTypesController.create,
    (req, response) => {
      response.redirect('/step_types');
    })

router.route('/edit/:type_id')
  .post(stepTypesController.update,
    (req, response) => {
      response.redirect('/step_types');
    })

module.exports = router;