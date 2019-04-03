const models = require('../DB/models')
const constants = require('../config/constants')

exports.count = async (req, response, next) => {
  const videosCount = await models.videos.count();
  const messagesCount = await models.messages.count();
  const categoriesCount = await models.categories.count();
  const pendingVideosCount = await models.videos.count({
    where: {
      status_id: constants.PENDING
    }
  });

  req.counts = {
    videos: videosCount,
    messages: messagesCount,
    categories: categoriesCount,
    pendingVideos: pendingVideosCount
  };

  next();
}