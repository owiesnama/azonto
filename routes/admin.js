const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, response) => {
            response.render('admin/index');
        }
    );

router.route('/users')
    .get((req, response) => {
        response.render('admin/users');
    });

router.route('/messages')
    .get((req, response) => {
        response.render('admin/messages');
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