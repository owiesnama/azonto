const i18n = require('i18n');
const colors = require('colors');
const FoldersService = require('../services/FoldersService');

exports.list = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  new FoldersService().findAll(null, pageSize, pageNumber)
    .then((result) => {
      req.folders = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.findBy = (req, response, next) => {
  const parentId = req.params.parent_id;

  new FoldersService().findAll({
      parent_id: parentId
    }, null, null)
    .then((result) => {
      req.folders = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.create = (req, response, next) => {
  const folder = {
    parent_id: req.body.parent_id,
    name: req.body.name,
    description: req.body.description,
    owner_id: req.session.user.user_id
  }

  new FoldersService().create(folder)
    .then((result) => {
      req.folder = result;
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error : error);
    });
}

exports.update = (req, response, next) => {
  const folder = {
    parent_id: req.body.parent_id,
    name: req.body.name,
    description: req.body.description,
    owner_id: req.body.owner_id
  }

  const folderId = parseInt(req.params.folder_id);

  new FoldersService().update(folder, folderId)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error : error);
    });
}

exports.rename = (req, response, next) => {
  const folder = {
    name: req.body.name,
  }

  const folderId = parseInt(req.params.folder_id);

  new FoldersService().rename(folder, folderId)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error : error);
    });
}