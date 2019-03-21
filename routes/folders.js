const express = require('express');
const router = express.Router();

const foldersController = require('../controller/folders');
// const authController = require('../controller/auth');

// list & create APIs
router.route('/')
  .get(foldersController.list,
    (req, response) => {
      response.send({
        folders: req.folders
      })
    })
  .post(foldersController.create,
    (req, response) => {
      response.send({
        folder: req.folder
      });
    });

// update API
router.route('/:folder_id')
  .put(foldersController.update,
    (req, response) => {
      response.redirect('/folders');
    })

// rename API
router.route('/rename/:folder_id')
  .put(foldersController.rename,
    (req, response) => {
      response.redirect('/folders');
    })

// search by parent_id API
router.route('/:parent_id')
  .get(foldersController.findBy,
    (req, response) => {
      response.status(200).send(req.folders);
    })

module.exports = router;