const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const usersProfilesModel = models.users_profiles;

const include = [{
  model: models.users,
  as: 'user',
  attributes:['name']
}];

class UsersProfilesDao extends BaseDao {
  constructor() {
    super(usersProfilesModel)
  }

  findOne(where = {}) {
    const options = {
      where,
      include,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const result = await usersProfilesModel.findOne(options)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = UsersProfilesDao