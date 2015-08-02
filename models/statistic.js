var thinky = require(__dirname+'/../util/thinky.js')
    , type = thinky.type
    , r = thinky.r
    , shortid = require('shortid');

var Statistic = thinky.createModel("Statistic", {
    id: type.string().validator(shortid.isValid).default(shortid.generate()),
    shortId: type.string(),
    visitedAt: type.date(r.now())
});

module.exports = Statistic;

var ShortUrl = require(__dirname+"/shortUrl");
Statistic.belongsTo(ShortUrl,"shorturl","shortId","id");