const express = require('express');
const router = express.Router();
const i18n = require('i18n');

const ac = require('../services/AccessControlService');
const workFlowsController = require('../controller/workflows');

router.use((req, response, next) => {
  const permission = ac.can(req.session.user.role).createAny('workflows');

  if (permission.granted) {
    next();
    return;
  }
  response.status(401).send(i18n.__('unauthorized'));
});

router.route('/')
  .post(workFlowsController.create,
    (req, response) => {
      response.redirect('/settings');
    })

module.exports = router;