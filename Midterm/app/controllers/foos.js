var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Foo = mongoose.model('Foo'),
    asyncHandler = require('express-async-handler');

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all foos');
        let query = Foo.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/foos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get foo %s', req.params.id);
        await Foo.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating foo');
        var foo = new Foo(req.body);
        const result = await foo.save()
        res.status(201).json(result);
    }));

    router.put('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating foo');
        await Foo.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/foos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting foo %s', req.params.id);
        await Foo.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));
};
