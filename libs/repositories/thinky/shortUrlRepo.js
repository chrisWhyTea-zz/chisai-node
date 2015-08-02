var   models = require(__dirname+'/../../../models/all')
    , thinky = require(__dirname+'/../../../util/thinky.js')
    , r = thinky.r;


/**
 * Save a new ShortUrl in Database
 * @param url
 * @param callback
 */
var createNew = function createNew(url,callback) {
    var newShortUrl = new models.ShortUrl({
        target: url
    });

    newShortUrl.save().then(function(shortUrl) {
        callback(null,shortUrl);
    }).catch(thinky.Errors.ValidationError, function() {
        callback(new Error("ValidationInvalidUrl"),null);
    }).error(function(err) {
        callback(err,null);
    });
};

module.exports = function publicFunctions() {
    return {
        createNew: createNew
    };
};