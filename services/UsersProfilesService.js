const Joi = require('joi')
const BaseService = require('./BaseService')
const models = require('../DB/models/index');
const UsersProfilesDao = require('../DAOs/UsersProfilesDao')

const usersProfilesModel = models.users_profiles;

const schema = {
  user_id: Joi.number().required()
};

class UsersProfilesService extends BaseService {
  constructor() {
    super(usersProfilesModel);
  }

  findOne(where = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new UsersProfilesDao().findOne(where)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  create(userProfile) {
    return new Promise(async (resolve, reject) => {
      try {
        let isError = this.validateInputs(userProfile, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        await super.create(userProfile);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = UsersProfilesService