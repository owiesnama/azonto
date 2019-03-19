const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const usersModel = models.users;

class UsersDao extends BaseDao {
  constructor() {
    super(usersModel)
  }
}

module.exports = UsersDao