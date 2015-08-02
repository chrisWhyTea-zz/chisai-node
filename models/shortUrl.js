var thinky = require(__dirname+'/util/thinky.js');
var type = thinky.type;

var ShortUrl = thinky.createModel("ShortUrl", {
    id: type.string(),
    short: type.string,
    target: type.string(),
    titel: type.string(),
    createdAt: type.date()
});

var Statistic = require(__dirname+"/statistic");
ShortUrl.hasMany(Statistic,"stats","id","shorturlId");