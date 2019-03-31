const Joi = require('joi')
const BaseService = require('./BaseService')
const models = require('../DB/models/index');

const categoriesModels = models.categories;

const schema = {
  name: Joi.string().required()
};

class CategoriesService extends BaseService {
  constructor() {
    super(categoriesModels);
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

  create(category) {
    return new Promise(async (resolve, reject) => {
      try {
        let isError = this.validateInputs(category, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        const result = await super.create(category);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = CategoriesService