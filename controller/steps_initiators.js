const i18n = require('i18n');
const colors = require('colors');
const StepsInitiatorsService = require('../services/StepsInitiatorsService');

exports.list = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  new StepsInitiatorsService().findAll(null, pageSize, pageNumber)
    .then((result) => {
      req.stepsInitiators = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.create = (req, response, next) => {
  const stepInitiator = {
    step_id: req.body.step_id,
    user_id: req.body.user_id
  }

  new StepsInitiatorsService().create(stepInitiator)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.update = (req, response, next) => {
  const stepInitiator = {
    step_id: req.body.step_id,
    user_id: req.body.user_id
  }

  const stepInitiatorId = parseInt(req.params.step_initiator_id);

  new StepsInitiatorsService().update(stepInitiator, stepInitiatorId)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}