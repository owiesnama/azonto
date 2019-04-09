const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const videosModel = models.videos;

const include = [{
    model: models.categories,
    as: 'category',
    attributes: ['category_id', 'name']
  },
  {
    model: models.featured_videos,
    as: 'featured_video',
    // attributes: ['category_id', 'name']
  }
]
class VideosDao extends BaseDao {
  constructor() {
    super(videosModel)
  }

  findAll(where = {}, pageSize, pageNumber, order = [
    ['created_at', 'DESC']
  ]) {
    const that = this;

    let options = {
      include: include,
      where: where,
      order
    }

    if (pageSize || pageNumber) {
      const offset = pageSize * pageNumber;
      options.offset = offset;
      options.limit = pageSize;
    }

    return new Promise((resolve, reject) => {
      that.model.findAll(options)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = VideosDao