const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const usersModel = models.users;

class UsersDao extends BaseDao {
  constructor() {
    super(usersModel)
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

module.exports = UsersDao