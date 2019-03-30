const i18n = require('i18n');
const groupArray = require('group-array');
const Sequelize = require('sequelize');
const VideosService = require('../services/VideosService');
const constants = require('../config/constants');

const _pageLimit = 20;

exports.list = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 60;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  // get  approved videos
  new VideosService().findAll({
      // TODO: set the status
      // status_id: constants.APPROVED
    }, pageSize, pageNumber)
    .then(async (result) => {
      // calc Number of pages
      const videosCount = await new VideosService().findAll(null, null, null, null);
      const pages = Math.ceil((videosCount.length) / _pageLimit);
      req.pages = pages

      req.videos = groupArray(result, 'created_at');
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.pending = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 60;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;


  // get pending videos
  new VideosService().findAll({
      status_id: constants.PENDING
    }, pageSize, pageNumber)
    .then(async (result) => {
      // calc Number of pages
      const videosCount = await new VideosService().findAll(null, null, null, null);
      const pages = Math.ceil((videosCount.length) / _pageLimit);
      req.pages = pages

      req.videos = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.trending = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 60;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  // get APPROVED videos
  new VideosService().findAll({
      // TODO: set status id
      // status_id: constants.APPROVED
    }, pageSize, pageNumber, [
      ['views', 'DESC']
    ])
    .then(async (result) => {
      // calc Number of pages
      const videosCount = await new VideosService().findAll(null, null, null, null);
      const pages = Math.ceil((videosCount.length) / _pageLimit);
    .then((result) => {
      req.trending = result;
      const pages = Math.ceil((result.length) / _pageLimit);
      req.pages = pages
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.recommended = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 60;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;
  const categoryId = parseInt(req.params.category_id);

  // get APPROVED videos
  new VideosService().findAll({
      // TODO: set status id
      // status_id: constants.APPROVED
      category_id: categoryId
    }, pageSize, pageNumber, [
      ['views', 'DESC']
    ])
    .then(async (result) => {
      // calc Number of pages
      const videosCount = await new VideosService().findAll(null, null, null, null);
      const pages = Math.ceil((videosCount.length) / _pageLimit);
      req.pages = pages

      req.videos = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.search = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 60;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  const _sequelizeLikeOperator = Sequelize.Op.like;
  const title = req.query.title;
  const description = req.query.description;
  let where = {
    status_id: constants.APPROVED
  };

  if (title) {
    where.title = {
      [_sequelizeLikeOperator]: `%${title}%`
    };
  }

  if (description) {
    where.description = {
      [_sequelizeLikeOperator]: `%${description}%`
    };
  }

  // get APPROVED videos
  new VideosService().findAll(
      where,
      pageSize,
      pageNumber,
      [
        ['created_at', 'DESC']
      ])
    .then(async (result) => {
      // calc Number of pages
      const videosCount = await new VideosService().findAll(null, null, null, null);
      const pages = Math.ceil((videosCount.length) / _pageLimit);
      req.pages = pages

      req.videos = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.findOne = (req, response, next) => {
  const videoId = parseInt(req.params.video_id);

  new VideosService().findOne({
      video_id: videoId,
      status_id: constants.APPROVED
    })
    .then((result) => {
      if (!result) {
        response.sendStatus(404);
      } else {
        req.video = result;
        next();
      }
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.createUpload = (req, response, next) => {
  // gets the generated file name from Multer
  const videoName = req.file.filename;

  // get the thumbnail generated from screenshot lib
  const thumbnail = req.thumbnail[0];
  const video = {
    title: req.body.title,
    email: req.body.email,
    description: req.body.description,
    url: videoName,
    player: constants.UPLOADED,
    thumbnail: thumbnail,
    status_id: constants.PENDING,
    category_id: req.body.category_id
  };

  new VideosService().create(video)
    .then((result) => {
      req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.createYoutube = (req, response, next) => {
  const video = {
    title: req.body.title,
    email: req.body.email,
    description: req.body.description,
    url: req.body.url,
    player: constants.YOUTUBE,
    thumbnail: null,
    status_id: constants.PENDING,
    category_id: req.body.category_id
  };

  new VideosService().create(video)
    .then((result) => {
      req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.update = (req, response, next) => {
  const videoId = parseInt(req.params.video_id);
  const video = {
    title: req.body.title,
    description: req.body.description,
    player: req.body.player,
    email: req.body.email,
    thumbnail: req.body.thumbnail,
    status_id: req.body.status_id,
    category_id: req.body.category_id
  };

  new VideosService().update(video, videoId)
    .then((result) => {
      req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.delete = (req, response, next) => {
  const videoId = parseInt(req.params.video_id);

  new VideosService().delete({
      video_id: videoId
    })
    .then((result) => {
      req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}