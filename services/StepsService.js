const Joi = require('joi')
const i18n = require('i18n');
const BaseService = require('./BaseService')
const models = require('../DB/models/index');
const StepsDao = require('../DAOs/StepsDao');

const stepsModels = models.steps;

const schema = {
  name: Joi.string().required(),
  description: Joi.string(),
  order: Joi.number().required(),
  workflow_id: Joi.number().required(),
  initiator_id: Joi.number().required(),
  type_id: Joi.number().required()
};

class StepsService extends BaseService {
  constructor() {
    super(stepsModels);
  }

  findAll(where, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new StepsDao().findAll(where, pageSize, pageNumber)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  create(workFlow) {
    return new Promise(async (resolve, reject) => {
      try {

        // set the order of new step to be plus one from the previous step
        let orderCount = await super.count({
          workflow_id: workFlow.workflow_id
        })
        workFlow.order = orderCount + 1;

        let isError = this.validateInputs(workFlow, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        const result = await super.create(workFlow);

        resolve(result);
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

  update(step, stepId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!stepId) {
          reject({
            code: 400,
            message: i18n.__("pk is not provided")
          });
          return;
        }

        let isError = this.validateInputs(step, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        const result = await super.update(step, {
          step_id: stepId
        });

        resolve(result);
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

  updateOrder(steps) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!steps || steps.length < 1) {
          reject({
            code: 400,
            message: i18n.__("required field", "")
          });
          return;
        }

        //loop thwo ever object in the `steps` array to get it's needed attributes
        steps.forEach(async step => {
          const stepId = step.step_id;
          let newStep = {};

          newStep.name = step.name;
          newStep.order = step.order;
          newStep.description = step.description;
          newStep.workflow_id = step.workflow_id;
          newStep.initiator_id = step.initiator_id;
          newStep.type_id = step.type_id;

          if (!stepId) {
            reject({
              code: 400,
              key: 'step_id',
              message: i18n.__("pk is not provided")
            });
            return;
          }

          let isError = this.validateInputs(newStep, schema);
          if (isError.error) {
            reject({
              code: 400,
              key: isError.error.details[0].context.key,
              message: i18n.__("required field", isError.error.details[0].context.label)
            });
            return;
          }

          await super.update(newStep, {
            step_id: stepId
          });
        });

        return resolve();
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

}

module.exports = StepsService