const colors = require('colors');
const FavoritesService = require('../services/FavoritesService');

exports.list = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  new FavoritesService().findAll(null, pageSize, pageNumber)
    .then((result) => {
      req.stepTypes = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.create = (req, response, next) => {
  const favorite = {
    user_id: req.body.user_id,
    attachment_id: req.body.attachment_id
  };

  new FavoritesService().create(favorite)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.update = (req, response, next) => {
  const favorite = {
    user_id: req.body.user_id,
    attachment_id: req.body.attachment_id
  };

  const favoriteId = parseInt(req.params.favorite_id);

  new FavoritesService().update(favorite, favoriteId)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}