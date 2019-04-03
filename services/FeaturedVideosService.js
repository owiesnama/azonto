const Joi = require('joi');
const i18n = require('i18n');
const BaseService = require('./BaseService');
const models = require('../DB/models/index');
const FeaturedVideosDao = require('../DAOs/FeaturedVideosDao');
const VideosService = require('./VideosService');

const featuredVideosModel = models.featured_videos;

const schema = {
  video_id: Joi.number().required(),
};

class FeaturedVideosService extends BaseService {
  constructor() {
    super(featuredVideosModel);
  }

  findAll(where = {}, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await new FeaturedVideosDao().findAll(where, pageSize, pageNumber);
        
        // if the featured videos is not there
        if (!result || result.length < 4) {
          result = await new VideosService().trending();
          for (let i = 0; i < 4; i++) {
            if (result[i]) {
              result[i].setDataValue('video', result[i])
              console.log('\n=========\n' + i, JSON.stringify(result[i]));
            }
          }
        };

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

        if (count && count.length >= 4) {
          reject({
            code: 400,
            message: "featured videos should not be more than 4"
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
        if (count) {
          featuredVideo.order = count.length + 1;
        } else {
          featuredVideo.order = 1
        }
        await super.create(featuredVideo);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  updateOrder(featuredVideos) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!featuredVideos || featuredVideos.length < 1) {
          reject({
            code: 400,
            message: i18n.__("required field", "")
          });
          return;
        }

        //loop throw ever object in the `featured videos` array to get it's needed attributes
        console.log(featuredVideos)
        featuredVideos.forEach(async video => {
          const featuredVideoId = video.featured_video_id;
          let newVideo = {};

          newVideo.order = video.order;

          if (!featuredVideoId) {
            reject({
              code: 400,
              key: 'featured_video_id',
              message: i18n.__("pk is not provided")
            });
            return;
          }

          await super.update(newVideo, {
            featured_video_id: featuredVideoId
          });
        });

        return resolve();
      } catch (error) {
        reject(error);
        console.log('\n ---------------- Error ----------------\n'.red, error);
      }
    });
  }

}

module.exports = FeaturedVideosService