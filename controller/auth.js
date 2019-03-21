const i18n = require('i18n');
const constants = require('../config/constants');
const ac = require('../services/AccessControlService');

exports.isLoggedIn = (req, response, next) => {
  if (req.session.user) {
    next();
  } else {
    response.redirect('/users/login');
  }
}

exports.isAdminOrItManager = (req, response, next) => {
  const role = req.session.user.role;

  if (role == constants.ADMIN || role == constants.IT_MANAGER) {
    next();
  } else {
    response.status(404).send(i18n.__("unauthorized"));
  }
}

exports.isAdmin = (req, response, next) => {
  const roleId = req.session.user.role;

  if (roleId && roleId == constants.ADMIN) {
    next();
  } else {
    response.status(404).send(i18n.__("unauthorized"));
  }
}

// exports.isAuthorized = (req, response, next) => {
//   // const permission = ac.can('admin').readAny('settings');
//   const permission = ac.can('admin').createAny('workflows');

//   if (permission.granted) {
//     next();
//     return;
//   }
//   response.status(401).send(i18n.__('unauthorized'));
// }