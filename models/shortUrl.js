var thinky = require(__dirname + '/../util/thinky.js')
    , r = thinky.r
    , type = thinky.type
    , validator = require('validator')
    , shortid = require('shortid');

var ShortUrl = thinky.createModel("ShortUrl", {
    id: type.string().required().validator(shortid.isValid),
    target: type.string().validator(validator.isURL).required(),
    createdAt: type.date().required()
});

module.exports = ShortUrl;

var Statistic = require("./statistic.js");
ShortUrl.hasMany(Statistic, "statistic", "id", "shortId");

