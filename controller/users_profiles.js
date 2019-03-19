const colors = require('colors')
const UsersProfilesService = require('../services/UsersProfilesService')

const emptyUser = {
  address: "",
  city: "",
  country: "",
  phone: "",
  about: ""
};

exports.findOne = (req, response, next) => {
  new UsersProfilesService().findOne({
      user_id: req.session.user.user_id
    })
    .then((result) => {
      if (!result) {
        result = emptyUser
      }
      req.user = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.update = (req, response, next) => {
  const user = {
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    about: req.body.about
  };

  new UsersProfilesService().update(user, {
      user_id: req.session.user.user_id
    })
    .then((result) => {
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}