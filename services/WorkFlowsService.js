const Joi = require('joi')
const i18n = require('i18n');
const models = require('../DB/models/index');
const BaseService = require('./BaseService')

const workFlowsModels = models.workflows;

const schema = {
  name: Joi.string().required(),
  slug: Joi.string().required(),
  description: Joi.string()
};

class WorkFlowsService extends BaseService {
  constructor() {
    super(workFlowsModels);
  }

  create(workFlow) {
    return new Promise(async (resolve, reject) => {
      try {
        let isError = this.validateInputs(workFlow, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        await super.create(workFlow);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = WorkFlowsService