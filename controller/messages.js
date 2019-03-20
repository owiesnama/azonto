const MessagesService = require('../services/MessagesService');

exports.list = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  new MessagesService().findAll(null, pageSize, pageNumber)
    .then((result) => {
      req.messages = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.findOne = (req, response, next) => {
  const messageId = parseInt(req.params.message_id);

  new MessagesService().findOne({
      message_id: messageId
    })
    .then((result) => {
      if (!result) {
        response.sendStatus(404);
      } else {
        req.message = result;
        next();
      }
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.create = (req, response, next) => {
  const message = {
    sender: req.body.sender,
    message: req.body.message
  };

  new MessagesService().create(message)
    .then((result) => {
      req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.update = (req, response, next) => {
  const messageId = parseInt(req.params.message_id);
  const message = {
    sender: req.body.sender,
    message: req.body.message
  };

  new MessagesService().update(message, messageId)
    .then((result) => {
      req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.delete = (req, response, next) => {
  const messageId = parseInt(req.params.message_id);

  new MessagesService().delete({
      message_id: messageId
    })
    .then((result) => {
      req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}