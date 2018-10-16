'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/api/users').get(function (req, res, next) {
        logger.log('verbose','Get all users');
        res.status(200).json({
            message: 'Got all users'});

	});
    };
