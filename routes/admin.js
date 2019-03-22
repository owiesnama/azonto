const messagesController = require('../controller/messages');
const usersController = require('../controller/users');

const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, response) => {
            response.render('admin/index');
        }
    );

router.route('/users')
    .get(usersController.list,(req, response) => {
        response.render('admin/users',{
            users:req.users
        });
    });

router.route('/messages')
    .get(messagesController.list,
        (req, response) => {
            console.log(req.messages);
            response.render('admin/messages', {
                messages: req.messages
            });
        });

router.route('/requests')
    .get((req, response) => {
        response.render('admin/requests');
    });

router.route('/videos')
    .get((req, response) => {
            response.render('admin/videos');
        }
    );

router.route('/login')
    .get((req, response) => {
            response.render('admin/login');
        }
    );

module.exports = router;