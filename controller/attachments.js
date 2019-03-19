const i18n = require('i18n');
const AttachmentsService = require('../services/AttachmentsService');

exports.findAll = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  new AttachmentsService().findAll(null, pageSize, pageNumber)
    .then((result) => {
      req.attachments = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.create = async (req, response, next) => {
  if (req.files.length > 0) {
    let attachments = [];

    for (let file = 0; file < req.files.length; file++) {
      let currentAttachment = {};
      const doc = req.files[file];
      currentAttachment.user_id = req.session.user.user_id;
      // TODO:FIXME: sets the folder id
      currentAttachment.folder_id = 1;
      currentAttachment.url = doc.filename;
      currentAttachment.display_name = doc.originalname;
      currentAttachment.size = doc.size;

      attachments.push(currentAttachment);
    }

    await new AttachmentsService().bulkCreate(attachments);

    next();
    return;
  }

  response.status(400).send(i18n.__('select_files'));
}