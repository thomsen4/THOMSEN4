var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Grades = mongoose.model('Grades'),
    asyncHandler = require('express-async-handler');

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/grades', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all grades');
        let query = Grades.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/grades/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get grade %s', req.params.id);
        await Grades.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/grades', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating grade');
        var grade = new Grades(req.body);
        const result = await grade.save()
        res.status(201).json(result);
    }));

    router.put('/grades', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating grade');
        await Grades.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/grades/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting grade %s', req.params.id);
        await Grades.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));
};
