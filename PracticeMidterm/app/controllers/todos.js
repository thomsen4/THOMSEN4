var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Todos = mongoose.model('Todos'),
    asyncHandler = require('express-async-handler');

    console.log(config);

module.exports = function (app, config) {
    app.use('/api', router);
    router.get('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all todos');
        let query = Todos.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/todos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get todos %s', req.params.id);
        await Todos.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating Todo');
        var todo = new Todo(req.body);
        const result = await todo.save()
        res.status(201).json(result);
    }));

    router.put('/todos', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating todo');
        await Todos.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/todos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting todos %s', req.params.id);
        await Todos.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));
};
