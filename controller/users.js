const sha1 = require('sha1')
const colors = require('colors')
const i18n = require('i18n')
const UsersService = require('../services/UsersService')
const SocketIoService = require('../services/SocketIOService')

exports.list = (req, response, next) => {
  new UsersService().findAll()
    .then((result) => {
      req.users = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.findById = (req, response, next) => {
  const user_id = req.query.user_id;

  new UsersService().findById(user_id)
    .then((result) => {
      req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.findOne = (req, response, next) => {
  const userId = req.params.user_id;

  new UsersService().findOne({user_id: userId})
    .then((result) => {
      if (!result) {
        response.status(404).send('not found');
        return;
      }
      req.user = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.create = (req, response, next) => {
  const role = req.body.role;

  if (req.body.password != req.body.password_confirmation) {
    response.status(400).send(i18n.__("passwords_do_not_match"))
    return;
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: sha1(req.body.password)
  };

  if (role) {
    user.role = 'admin'
  } else {
    user.role = 'user'
  }

  new UsersService().create(user)
    .then((result) => {
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.update = (req, response, next) => {
  const roleId = req.body.role;

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: sha1(req.body.password)
  };

  if (roleId) {
    user.role = 1
  } else {
    user.role = 2
  }

  const where = {
    user_id: req.params.user_id
  }

  new UsersService().update(user, where)
    .then((result) => {
      req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.login = (req, response, next) => {
  const where = {
    email: req.body.email,
    password: sha1(req.body.password)
  }

  new UsersService().findOne(where)
    .then(async (result) => {
      if (!result) {
        response.status(400).send(i18n.__('invalid_login'));
        return;
      } else {
        //set only the needed user attributes
        const user = {
          user_id: result.user_id,
          name: result.name,
          role: result.role,
        }

        await new SocketIoService().newClient(user.user_id)

        req.session.user = user;
        response.locals.user = user;
        next();
      }
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.logout = (req, response) => {
  response.redirect('/');
}