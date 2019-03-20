const Joi = require('joi');
const i18n = require('i18n');
const BaseService = require('./BaseService');
const models = require('../DB/models/index');
const messagesModel = models.messages;

const schema = {
  sender: Joi.string().required(),
  message: Joi.string().required()
};

class MessagesService extends BaseService {
  constructor() {
    super(messagesModel);
  }

  findAll(where = {}, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await super.findAll(where, null, pageSize, pageNumber)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  create(message) {
    return new Promise(async (resolve, reject) => {
      try {
        const isError = this.validateInputs(message, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        await super.create(message);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  update(message, messageId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!messageId) {
          reject({
            code: 400,
            key: "video id",
            message: i18n.__("required field", "message id")
          });
          return;
        }

        const isError = this.validateInputs(message, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        await super.update(message, {
          message_id: messageId
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = MessagesService