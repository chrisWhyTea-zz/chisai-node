var express = require('express')
    , router = express.Router()
    , HttpStatus = require('http-status-codes')
    , shortUrlRepo = require(__dirname + '/../libs/repositories/thinky/shortUrlRepo')()
    , statisticRepo = require(__dirname + '/../libs/repositories/thinky/statisticRepo')()
    , _ = require('lodash');


router.get('/', function (req, res) {
    var resObj = {
        flash: {
            success: req.cookies.flashSuccess || null,
            error: req.cookies.flashError || null,
            oldForm: req.cookies.flashOldForm || null
        }
    };
    // Ugly Flash Message stuff... will be replaced with a middleware later
    res.clearCookie('flashSuccess');
    res.clearCookie('flashError');
    res.clearCookie('flashOldForm');
    //
    res.status(HttpStatus.OK);
    res.render('index', resObj);
});

router.get('/:id', function (req, res) {
    shortUrlRepo.getTargetById(req.params.id, function (err, shortUrl) {
        if (err) {
            if (err.message == 'ModelIdNotFound') {
                res.cookie('flashError', 'ShortUrlNotFound');
                res.redirect(HttpStatus.NOT_FOUND, '/');
            } else {
                // TODO Log Error in logger facility
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
                res.render('ErrorInternal');
            }
        } else {
            statisticRepo.addStatistic(req.params.id, function (err) {
                if (err) {
                    // TODO Log Error in logger facility
                    console.log(err);
                }
                res.redirect(shortUrl);
            });
        }
    });
});

router.get('/:id/statistic', function (req, res) {
    shortUrlRepo.getById(req.params.id, function (err, shortUrlStats) {
        if (err) {
            if (err.message == 'ModelIdNotFound') {
                res.cookie('flashError', 'ShortUrlNotFound');
                res.redirect(HttpStatus.NOT_FOUND, '/');
            } else {
                // TODO Log Error in logger facility
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
                res.render('ErrorInternal');
            }
        } else {
            // TODO use the rethinkDB map reduce function (when it's ready to use in thinky with getJoin
            shortUrlStats.statistic = _.map(
                _.groupBy(shortUrlStats.statistic, function (n) {
                    return n.visitedAt;
                }),
                function (n, key) {
                    var obj = {};
                    obj[key] = n.length;
                    return obj;
                });
            var resObj = {flash: {success: req.cookies.flashSuccess || null}, stats: shortUrlStats};
            res.clearCookie('flashSuccess');
            res.render('statistic', resObj);
        }
    });
});

router.post('/', function (req, res) {
    shortUrlRepo.createNew(req.body.target, function (err, shortUrlStats) {
        if (err) {
            if (err.message == 'ValidationInvalidUrl') {
                res.cookie('flashError', 'InvalidUrl');
                res.cookie('flashOldForm', req.body.target);
                res.redirect(HttpStatus.UNPROCESSABLE_ENTITY, '/');
            } else {
                // TODO Log Error in logger facility
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
                res.render('ErrorInternal');
            }
        } else {
            res.cookie('flashSuccess', 'ShortUrlCreated');
            res.redirect('/' + shortUrlStats.id + '/statistic');
        }
    });
});

module.exports = router;
