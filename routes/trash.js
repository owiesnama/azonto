const express = require('express');
const router = express.Router();


router.route('/')
    .get((req, response) => {
        response.render('trash/index')
    });


module.exports = router;