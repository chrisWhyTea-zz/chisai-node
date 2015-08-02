var thinky = require(__dirname+'/../util/thinky.js')
, r = thinky.r
, type = thinky.type
, validator = require('validator');

var ShortUrl = thinky.createModel("ShortUrl", {
    shortId: type.string().required(),
    target: type.string().validator(validator.isURL).required(),
    titel: type.string(),
    createdAt: type.date().default(r.now())
},{
    pk: "short"
});

module.exports = ShortUrl;

var Statistic = require(__dirname+"/statistic");
ShortUrl.hasMany(Statistic,"stats","shortId","shortId");
