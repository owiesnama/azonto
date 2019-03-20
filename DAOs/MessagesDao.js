const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const messagesModel = models.messages;

class MessagesDao extends BaseDao {
  constructor() {
    super(messagesModel)
  }

  findAll(where = {}, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await super.findAll(where, null, pageSize, pageNumber);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = MessagesDao