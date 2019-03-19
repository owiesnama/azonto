const Joi = require('joi')
const i18n = require('i18n');
const BaseService = require('./BaseService')
const models = require('../DB/models/index');

const favoritesModel = models.favorites;

const schema = {
  user_id: Joi.number().required(),
  attachment_id: Joi.number().required(),
};

class FavoritesService extends BaseService {
  constructor() {
    super(favoritesModel);
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

  create(favorite) {
    return new Promise(async (resolve, reject) => {
      try {
        let isError = this.validateInputs(favorite, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        const result = await super.create(favorite);

        resolve(result);
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

  update(favorite, favoriteId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!favoriteId) {
          reject({
            code: 400,
            key: "favorite_id",
            message: i18n.__("pk is not provided")
          });
          return;
        }

        let isError = this.validateInputs(favorite, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        const result = await super.update(favorite, {
          favorite_id: favoriteId
        });

        resolve(result);
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

}

module.exports = FavoritesService