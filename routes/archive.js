const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, response) => {
            response.render('archive/index');
        }
    );

module.exports = router;