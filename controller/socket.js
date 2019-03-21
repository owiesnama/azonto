const SocketIoService = require('../services/SocketIOService')

exports.broadcast = (req, response, next) => {
  const message = req.body.message;

  new SocketIoService().broadcast(message)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
};

exports.send = (req, response, next) => {
  const message = req.body.message;
  const userId = req.body.user_id;

  new SocketIoService().send(userId, message)
    .then((result) => {
      next();
    }).catch((error) => {
      console.log('\n ---------------- Error ----------------\n'.red, error);
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
};