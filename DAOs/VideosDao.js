const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const videosModel = models.videos;

class VideosDao extends BaseDao {
  constructor() {
    super(videosModel)
  }

  findAll(where = {}, include = [], pageSize, pageNumber, order = [
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

  // findAll(where = {}, pageSize, pageNumber) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const result = await super.findAll(where, null, pageSize, pageNumber);
  //       resolve(result);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }

}

module.exports = VideosDao