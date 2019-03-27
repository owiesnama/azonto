const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const categoriesModel = models.categories;

class CategoriesDao extends BaseDao {
  constructor() {
    super(categoriesModel)
  }
}

module.exports = CategoriesDao