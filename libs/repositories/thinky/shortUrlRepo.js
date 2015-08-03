var models = require(__dirname + '/../../../models/all')
    , thinky = require(__dirname + '/../../../util/thinky.js')
    , shortid = require('shortid')
    , r = thinky.r;


/**
 * Save a new ShortUrl
 * @param url
 * @param callback
 */
var createNew = function createNew(url, callback) {
    var newShortUrl = new models.ShortUrl({
        id: shortid.generate(),
        target: url,
        createdAt: r.now()
    });

    newShortUrl.save()
        .then(function (shortUrl) {
            callback(null, shortUrl);
        })
        .catch(thinky.Errors.ValidationError, function () {
            callback(new Error("ValidationInvalidUrl"), null);
        })
        .error(function (err) {
            console.log(err);
            callback(err, null);
        });
};

/**
 * Get only the Target Url of an shorturl
 * @param id
 * @param callback
 */
var getTargetById = function getTargetById(id, callback) {
    models.ShortUrl.get(id)
        .then(function (shortUrl) {
            callback(null, shortUrl.target);
        })
        .catch(thinky.Errors.DocumentNotFound, function () {
            callback(new Error("ModelIdNotFound"), null);
        })
        .error(function (err) {
            callback(err, null);
        });
};

/**
 * Get all Data of an shorturl
 * @param id
 * @param callback
 */
var getById = function getById(id, callback) {
    models.ShortUrl
        .get(id)
        .getJoin({
            statistic: true
            //{
            //    _apply: function(sequence) {
            //        return sequence.group('visitedAt');
            //    }
            //}
        })
        .then(function (shortUrl) {
            callback(null, shortUrl);
        })
        .catch(thinky.Errors.DocumentNotFound, function () {
            callback(new Error("ModelIdNotFound"), null);
        })
        .error(function (err) {
            console.log(err);
            callback(err, null);
        });
};

module.exports = function publicFunctions() {
    return {
        createNew: createNew
        , getById: getById
        , getTargetById: getTargetById
    };
};