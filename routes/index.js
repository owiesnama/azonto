const express = require('express');
const router = express.Router();

// const attachmentsController = require('../controller/attachments');

router.get('/',
  (req, response) => {
    response.status(200).send('hi');
  });

// router.get('/login', (req, response) => {
//   response.render('auth/login')
// })

// router.get('/register', (req, response) => {
//   response.render('auth/register')
// })

// router.get('/home',
//   attachmentsController.findAll,
//   (req, response) => {
//     response.render('home', {
//       attachments: req.attachments
//     });
//   });

module.exports = router;