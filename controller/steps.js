const i18n = require('i18n');
const colors = require('colors');
const StepsService = require('../services/StepsService');

exports.list = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  new StepsService().findAll(null, pageSize, pageNumber)
    .then((result) => {
      req.steps = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.create = (req, response, next) => {
  const step = {
    name: req.body.name,
    description: req.body.description,
    workflow_id: req.body.workflow_id,
    initiator_id: req.body.initiator_id,
    type_id: req.body.type_id
  }

  new StepsService().create(step)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.update = (req, response, next) => {
  const step = {
    name: req.body.name,
    order: req.body.order,
    description: req.body.description,
    workflow_id: req.body.workflow_id,
    initiator_id: req.body.initiator_id,
    type_id: req.body.type
  }

  const stepId = parseInt(req.params.step_id);

  new StepsService().update(step, stepId)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.findByWorkflowId = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  new StepsService().findAll({
      workflow_id: req.params.workflow_id
    }, pageSize, pageNumber)
    .then((result) => {
      req.steps = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}


exports.updateOrder = (req, response, next) => {
  const steps = req.body;

  new StepsService().updateOrder(steps)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}