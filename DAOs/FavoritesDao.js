const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const favoritesModel = models.favorites;

class FavoritesDao extends BaseDao {
  constructor() {
    super(favoritesModel)
  }
}

module.exports = FavoritesDao