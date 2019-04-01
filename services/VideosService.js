const Joi = require('joi');
const i18n = require('i18n');
const BaseService = require('./BaseService');
const models = require('../DB/models/index');
const VideosDao = require('../DAOs/VideosDao');
const constants = require('../config/constants');

const videosModel = models.videos;

const schema = {
  title: Joi.string().required(),
  email: Joi.string().required(),
  description: Joi.string().required(),
  url: Joi.string().required(),
  player: Joi.number().required(),
  thumbnail: Joi.string().allow(null),
  status_id: Joi.number().required(),
  category_id: Joi.number().required()
};

const updateSchema = {
  title: Joi.string().required(),
  email: Joi.string().required(),
  description: Joi.string().required(),
  player: Joi.number().required(),
  thumbnail: Joi.string().allow(null),
  status_id: Joi.number().required(),
  category_id: Joi.number().required()
};

class VideosService extends BaseService {
  constructor() {
    super(videosModel);
  }

  findAll(where = {}, pageSize, pageNumber, orderBy) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await new VideosDao().findAll(where, pageSize, pageNumber, orderBy)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  trending() {
    return new Promise(async (resolve, reject) => {
      try {
        const _sequelize = models.sequelize;

        // get the videos views summation 
        const sum = await _sequelize.query('SELECT sum(views) as sum FROM videos', {
          type: _sequelize.QueryTypes.SELECT
        });

        // gets the sum value from the sum[] array
        const sumValue = sum[0].sum;

        // calc the 25% of viewed videos
        const quarter = (sumValue * .25);

        console.log('sum: '.green, JSON.stringify(sumValue));
        console.log('quarter: '.green, (quarter));

        // return the top 10 trending videos 
        const result = await new VideosDao().findAll({
          status_id: constants.APPROVED,
          views: {
            [_sequelize.Op.gt]: quarter
          }
        }, 10, 0, [
          ['views', 'DESC']
        ])
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  create(video) {
    return new Promise(async (resolve, reject) => {
      try {
        const isError = this.validateInputs(video, schema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        await super.create(video);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  update(video, videoId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!videoId) {
          reject({
            code: 400,
            key: "video id",
            message: i18n.__("required field", "video id")
          });
          return;
        }

        const isError = this.validateInputs(video, updateSchema);
        if (isError.error) {
          reject({
            code: 400,
            key: isError.error.details[0].context.key,
            message: i18n.__("required field", isError.error.details[0].context.label)
          });
          return;
        }

        await super.update(video, {
          video_id: videoId
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = VideosService