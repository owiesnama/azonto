const express = require('express');
const router = express.Router();

const stepTypesController = require('../controller/step_types');
const usersController = require('../controller/users');
const stepsController = require('../controller/steps');
// const authController = require('../controller/auth');

router.route('/list')
  .get(stepsController.list,
    (req, response) => {
      response.status(200).send(req.steps);
      return;
      //TODO: set your view ya owies ^_^
      response.render('', {
        users: req.users,
        stepTypes: req.stepTypes,
      })
    })

router.route('/')
  .get(
    usersController.list,
    stepTypesController.list,
    (req, response) => {
      //TODO: set your view ya owies ^_^
      response.render('', {
        users: req.users,
        stepTypes: req.stepTypes,
      })
    })
  .post(stepsController.create,
    (req, response) => {
      response.redirect('/steps');
    })

router.route('/edit/:step_id')
  .post(stepsController.update,
    (req, response) => {
      response.redirect('/steps');
    })

router.route('/update/order/')
  .post(stepsController.updateOrder,
    (req, response) => {
      response.redirect('/steps');
    })

module.exports = router;