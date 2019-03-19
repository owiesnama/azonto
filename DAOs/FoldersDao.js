const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const stepsModel = models.folders;

const include = [{
  model: models.folders,
  as: 'sub_folder',
}, {
  model: models.users,
  as: 'owner',
  attributes: ['name', 'role']
}, {
  model: models.attachments,
  as: 'attachments'
}];

class FoldersDao extends BaseDao {
  constructor() {
    super(stepsModel)
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

module.exports = FoldersDao