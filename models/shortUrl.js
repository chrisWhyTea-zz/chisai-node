var thinky = require(__dirname+'/../util/thinky.js')
    , r = thinky.r
    , type = thinky.type
    , validator = require('validator')
    , shortid = require('shortid');

var ShortUrl = thinky.createModel("ShortUrl", {
    id: type.string().required().validator(shortid.isValid).default(shortid.generate()),
    target: type.string().validator(validator.isURL).required(),
    createdAt: type.date().default(r.now())
});

module.exports = ShortUrl;

var Statistic = require(__dirname+"/statistic");
ShortUrl.hasMany(Statistic,"statistic","id","shortId");
