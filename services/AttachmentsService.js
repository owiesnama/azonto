const Joi = require('joi');
const BaseService = require('./BaseService');
const models = require('../DB/models/index');
const AttachmentsDao = require('../DAOs/AttachmentsDao');

const attachmentsModel = models.attachments;

const schema = {
  user_id: Joi.number().required(),
  url: Joi.string().required(),
  display_name: Joi.string(),
  size: Joi.number()
};

class AttachmentsService extends BaseService {
  constructor() {
    super(attachmentsModel);
  }

  findAll(where = {}, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new AttachmentsDao().findAll(where, null, pageSize, pageNumber)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  create(doc) {
    return new Promise(async (resolve, reject) => {
      try {
        let isError = this.validateInputs(doc, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        const result = await super.create(doc);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = AttachmentsService