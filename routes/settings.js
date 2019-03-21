const express = require('express');
const router = express.Router();
const i18n = require('i18n');

const ac = require('../services/AccessControlService');
const workFlowsController = require('../controller/workflows');
const stepsController = require('../controller/steps');

router.use((req, response, next) => {
  const permission = ac.can(req.session.user.role).readAny('settings');

  if (permission.granted) {
    next();
    return;
  }
  response.status(401).send(i18n.__('unauthorized'));
});

router.route('/')
  .get(workFlowsController.list,
    (req, response) => {
      response.render('settings/index', {
        workFlows: req.workFlows
      });
    }
  );


router.route('/workflow/:workflow_id')
  .get(stepsController.findByWorkflowId,
    (req, response) => {
      response.render('settings/steps', {
        steps: req.steps
      });
    });


module.exports = router;