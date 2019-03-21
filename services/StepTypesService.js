const Joi = require('joi')
const i18n = require('i18n');
const BaseService = require('./BaseService')
const models = require('../DB/models/index');

const stepTypesModel = models.step_types;

const schema = {
  name: Joi.string().required()
};

class StepTypesService extends BaseService {
  constructor() {
    super(stepTypesModel);
  }

  findAll(where, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await super.findAll(where, null, pageSize, pageNumber)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  create(stepType) {
    return new Promise(async (resolve, reject) => {
      try {
        let isError = this.validateInputs(stepType, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        const result = await super.create(stepType);

        resolve(result);
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

  update(stepType, typeId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!typeId) {
          reject({
            code: 400,
            key: 'type_id',
            message: i18n.__("pk is not provided")
          });
          return;
        }

        let isError = this.validateInputs(stepType, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        const result = await super.update(stepType, {
          type_id: typeId
        });

        resolve(result);
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

}

module.exports = StepTypesService