const Joi = require('joi')
const i18n = require('i18n');
const BaseService = require('./BaseService')
const models = require('../DB/models/index');
const FoldersDao = require('../DAOs/FoldersDao');

const folderModels = models.folders;

const schema = {
  parent_id: Joi.number(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  owner_id: Joi.number().required()
};

class FoldersService extends BaseService {
  constructor() {
    super(folderModels);
  }

  findAll(where, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new FoldersDao().findAll(where, pageSize, pageNumber)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  create(folder) {
    return new Promise(async (resolve, reject) => {
      try {
        const isError = this.validateInputs(folder, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        const result = await super.create(folder);

        resolve(result);
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

  update(folder, folderId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!folderId) {
          reject({
            code: 400,
            key: "folder_id",
            message: i18n.__("pk is not provided")
          });
          return;
        }

        let isError = this.validateInputs(folder, schema);
        if (isError.error) {
          // return console.log(isError.error.details[0]);

          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        const result = await super.update(folder, {
          folder_id: folderId
        });

        resolve(result);
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

  rename(folder, folderId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!folderId) {
          reject({
            code: 400,
            key: "folder_id",
            message: i18n.__("pk is not provided")
          });
          return;
        }

        if (!folder.name) {
          reject({
            code: 400,
            key: "name",
            message: i18n.__("required field", name)
          });
          return;
        }

        const result = await super.update(folder, {
          folder_id: folderId
        });

        resolve(result);
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

}

module.exports = FoldersService;