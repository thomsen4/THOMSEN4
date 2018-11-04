var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    HelpTicket = mongoose.model('HelpTicket'),
    HelpTicketContent = mongoose.model('HelpTicketContent'),
    asyncHandler = require('express-async-handler');

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/helptickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all help tickets');
        let query = HelpTicket.find();
        query
            .sort(req.query.order)
            .populate({ path: 'personID', model: 'User', select: 'lastName firstName' })
            .populate({ path: 'owmerID', model: 'User', select: 'lastName firstName' });
        if (req.query.status) {
            if (req.query.status[0] == '-') {
                query.where('status').ne(req.query.status.substring(1));
            } else {
                query.where('status').eq(req.query.status);
            }
        };
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/helpTickets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get help ticket %s', req.params.id);
        await HelpTicket.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating help ticket');
        var helpTicket = new HelpTicket(req.body);
        const result = await helpTicket.save()
        res.status(201).json(result);
    }));

    router.put('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating helpTickets');
        await HelpTicket.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/helpTickets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting help ticket %s', req.params.id);
        await HelpTicket.remove({ _id: req.params.id })
        await HelpTicketContent.remove({ helpTicketID : req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.get('/helpticketContent', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all help ticket contents');
        let query = HelpTicketContent.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/helpTicketContent/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get help ticket content for %s', req.params.id);
        await HelpTicketContent.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/helpTicketContent/helpTicket/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get help ticket content for help ticket %s', req.params.id);
        await HelpTicketContent.find({helpTicketID : req.params.id}).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/helpTicketContent', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating help ticket content');
        var helpTicketContent = new HelpTicketContent(req.body);
        const result = await helpTicketContent.save()
        res.status(201).json(result);
    }));

    router.put('/helpTicketContent', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating help ticket content');
        await HelpTicketContent.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/helpTicketContent/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting help ticket content %s', req.params.id);
        await HelpTicketContent.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));
};
