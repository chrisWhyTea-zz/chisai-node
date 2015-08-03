var thinky = require(__dirname+'/../util/thinky.js')
    , r = thinky.r
    , type = thinky.type
    , shortid = require('shortid');

var Statistic = thinky.createModel("Statistic", {
    id: type.string().validator(shortid.isValid).required(),
    shortId: type.string().required(),
    visitedAt: type.date().required()
});

module.exports = Statistic;

var ShortUrl = require("./shortUrl.js");
Statistic.belongsTo(ShortUrl,"shorturl","shortId","id");
