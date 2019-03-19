const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const attachmentsModel = models.attachments;

const include = [{
  model: models.users,
  as: 'user',
  attributes: ['user_id', 'name']
}, {
  model: models.folders,
  as: 'folder'
}];

class AttachmentsDao extends BaseDao {
  constructor() {
    super(attachmentsModel)
  }

  findAll(where = {}, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await super.findAll(where, include, pageSize, pageNumber);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = AttachmentsDao