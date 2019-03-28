const i18n = require('i18n');
const groupArray = require('group-array');
const Sequelize = require('sequelize');
const VideosService = require('../services/VideosService');
const constants = require('../config/constants');

exports.list = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  // get  approved videos
  new VideosService().findAll({
      // TODO: set the status
      // status_id: constants.APPROVED
    }, pageSize, pageNumber)
    .then((result) => {
      req.videos = groupArray(result, 'created_at');
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.pending = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  // get pending videos
  new VideosService().findAll({
      status_id: constants.PENDING
    }, pageSize, pageNumber)
    .then((result) => {
      req.videos = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.trending = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  // get APPROVED videos
  new VideosService().findAll({
      // TODO: set status id
      // status_id: constants.APPROVED
    }, pageSize, pageNumber, [
      ['views', 'DESC']
    ])
    .then((result) => {
      req.videos = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.recommended = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
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
    .then((result) => {
      req.videos = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.search = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  const _sequelizeLikeOperator = Sequelize.Op.like;
  const title = req.body.title;
  const description = req.body.description;
  let where = {
    // TODO: set status id
    // status_id: constants.APPROVED
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
    .then((result) => {
      req.videos = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.findOne = (req, response, next) => {
  const videoId = parseInt(req.params.video_id);

  new VideosService().findOne({
      video_id: videoId
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

exports.create = (req, response, next) => {
  // gets the generated file name from Multer
  const videoName = req.file.filename;

  // get the thumbnail generated from screenshot lib
  const thumbnail = req.thumbnail[0];
  const video = {
    title: req.body.title,
    email: req.body.email,
    description: req.body.description,
    url: videoName,
    player: req.body.player,
    thumbnail: thumbnail,
    status_id: constants.PENDING,
    // FIXME: change to real value
    // category_id: req.body.category_id
    category_id: 1
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


// exports.create = async (req, response, next) => {
//   if (req.files.length > 0) {
//     let attachments = [];

//     for (let file = 0; file < req.files.length; file++) {
//       let currentAttachment = {};
//       const doc = req.files[file];
//       currentAttachment.user_id = req.session.user.user_id;
//       // TODO:FIXME: sets the folder id
//       currentAttachment.folder_id = 1;
//       currentAttachment.url = doc.filename;
//       currentAttachment.display_name = doc.originalname;
//       currentAttachment.size = doc.size;

//       attachments.push(currentAttachment);
//     }

//     await new VideosService().bulkCreate(attachments);

//     next();
//     return;
//   }

//   response.status(400).send(i18n.__('select_files'));
// }