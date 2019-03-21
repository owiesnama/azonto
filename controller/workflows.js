const i18n = require('i18n');
const colors = require('colors');
const WorkFlowsService = require('../services/WorkFlowsService');

exports.list = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  new WorkFlowsService().findAll(null, null, pageSize, pageNumber)
    .then((result) => {
      req.workFlows = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.create = (req, response, next) => {
  const name = req.body.name;
  const workFlow = {
    name: name,
    slug: name,
    description: req.body.description
  }

  new WorkFlowsService().create(workFlow)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}