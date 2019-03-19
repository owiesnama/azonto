const Joi = require('joi')
const BaseService = require('./BaseService')
const models = require('../DB/models/index');

const usersModels = models.users;

const schema = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role_id: Joi.number().required()
};

class UsersService extends BaseService {
  constructor() {
    super(usersModels);
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

  create(user) {
    return new Promise(async (resolve, reject) => {
      try {
        let isError = this.validateInputs(user, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        await super.create(user);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = UsersService