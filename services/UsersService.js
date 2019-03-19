const Joi = require('joi')
const BaseService = require('./BaseService')
const models = require('../DB/models/index');
const UsersDao = require('../DAOs/UsersDao')
const UsersProfilesService = require('./UsersProfilesService')

const usersModels = models.users;

const schema = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required()
};

class UsersService extends BaseService {
  constructor() {
    super(usersModels);
  }

  findAll(where, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new UsersDao().findAll(where, pageSize, pageNumber)
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

        const result = await super.create(user);

        // add user_id to users_profiles table
        await new UsersProfilesService().create({
          user_id: result.user_id
        });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = UsersService