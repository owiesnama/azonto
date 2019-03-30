const Joi = require('joi');
const i18n = require('i18n');
const BaseService = require('./BaseService');
const models = require('../DB/models/index');
const FeaturedVideosDao = require('../DAOs/FeaturedVideosDao');

const featuredVideosModel = models.featured_videos;

const schema = {
  video_id: Joi.number().required()
};

class FeaturedVideosService extends BaseService {
  constructor() {
    super(featuredVideosModel);
  }

  findAll(where = {}, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new FeaturedVideosDao().findAll(where, pageSize, pageNumber);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  create(featuredVideo) {
    return new Promise(async (resolve, reject) => {
      try {

        // checks that the videos count is less than 4
        const count = await this.findAll();
        if (count.length >= 4) {
          reject({
            code: 400,
            message: "featured videos sholud not be more than 4"
          })
          return;
        }

        const isError = this.validateInputs(featuredVideo, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        await super.create(featuredVideo);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = FeaturedVideosService