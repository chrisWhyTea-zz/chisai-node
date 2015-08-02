var thinky = require(__dirname+'/../util/thinky.js');
var type = thinky.type;

var Statistic = thinky.createModel("Statistic", {
    id: type.string(),
    shorturlId: type.string(),
    visitedAt: type.date()
});

module.exports = Statistic;

var ShortUrl = require(__dirname+"/shortUrl");
Statistic.belongsTo(ShortUrl,"shorturl","shorturlId","id");