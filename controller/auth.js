exports.isLoggedIn = (req, response, next) => {
  if (req.session.user) {
    next();
  } else {
    response.redirect('/admin/login');
  }
}