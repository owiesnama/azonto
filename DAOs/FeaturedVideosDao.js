const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const featuredVideosModel = models.featured_videos;

const include = [{
  model: models.videos,
  as: 'video'
}]

class FeaturedVideosDao extends BaseDao {
  constructor() {
    super(featuredVideosModel)
  }

  findAll(where = {}, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await super.findAll(where, include, pageSize, pageNumber, [
          ['order', 'DESC']
        ]);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = FeaturedVideosDao