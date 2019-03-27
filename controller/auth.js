exports.isLoggedIn = (req, response, next) => {
  if (req.session.user) {
    next();
  } else {
    response.redirect('/admin/login');
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