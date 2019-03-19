const colors = require('colors');
const StepTypesService = require('../services/StepTypesService');

exports.list = (req, response, next) => {
  // TODO: pagination or create new function to display all of them
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  new StepTypesService().findAll(null, null, null)
    .then((result) => {
      req.stepTypes = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.create = (req, response, next) => {
  const stepType = {
    name: req.body.name
  }

  new StepTypesService().create(stepType)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.update = (req, response, next) => {
  const stepType = {
    name: req.body.name
  }

  const typeId = parseInt(req.params.type_id);

  new StepTypesService().update(stepType, typeId)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}