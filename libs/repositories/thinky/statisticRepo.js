var models = require(__dirname + '/../../../models/all')
    , thinky = require(__dirname + '/../../../util/thinky.js')
    , shortid = require('shortid')
    , r = thinky.r;


/**
 * Add Statistic Entry
 * @param shortId
 * @param callback
 */
var addStatistic = function addStatistic(shortId, callback) {
    var newStatisticEntry = new models.Statistic({
        id: shortid.generate(),
        shortId: shortId,
        visitedAt: r.now().date()
    });
    newStatisticEntry.save()
        .then(function (result) {
            callback(null, true);
        })
        .error(function (err) {
            callback(err, null);
        });
};

module.exports = function publicFunctions() {
    return {
        addStatistic: addStatistic
    };
};