const sha1 = require('sha1')
const colors = require('colors')
const i18n = require('i18n')
const CategoriesService = require('../services/CategoriesService')

exports.list = (req, response, next) => {
  new CategoriesService().findAll()
    .then((result) => {
      req.categories = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.create = (req, response, next) => {
  const category = {
    name: req.body.name,
  };

  new CategoriesService().create(category)
    .then((result) => {
      req.category = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.update = (req, response, next) => {
  const categoryId = parseInt(req.params.category_id);
  const category = {
    name: req.body.name
  };

  new CategoriesService().update(category, {
      category_id: categoryId
    })
    .then((result) => {
      req.categories = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.delete = (req, response, next) => {
  const categoryId = parseInt(req.params.category_id);

  new CategoriesService().delete({
      category_id: categoryId
    })
    .then((result) => {
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}