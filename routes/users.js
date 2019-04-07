const express = require('express');
const colors = require('colors');
const constants = require('../config/constants');

const router = express.Router();

const ac = require('../services/AccesscontrolService');
const usersController = require('../controller/users');
const authController = require('../controller/auth');

// login API
router.route('/login')
    .post(usersController.login,
        (req, response) => {
            response.send({user: req.session.user});
        });


// checks that the session is set for the bellow APIs 
router.use(authController.isLoggedIn);

// list && create APIs
router.route('/')
    .get((req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).readAny('users');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        usersController.list,
        (req, response) => {
            response.render('admin/users', {
                users: req.users
            });
        })
    .post((req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).createAny('users');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        usersController.create,
        (req, response) => {
            response.send({
                user: req.user
            });
        });

// update, delete APIs
router.route('/:user_id')
    .put((req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).updateAny('users');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        },
        usersController.update,
        (req, response) => {
            response.sendStatus(200);
        })
    .delete((req, response, next) => {
            const permission = ac.can('' + req.session.user.role_id).deleteAny('users');
            if (permission.granted) {
                next();
            } else {
                response.status(403).send('unauthorized');
            }
        }, usersController.delete,
        (req, response) => {
            // FIXME: it return 403 even if the user is auth to delete
            response.sendStatus(200);
        })

router.route('/logout')
    .get(usersController.logout);

module.exports = router;