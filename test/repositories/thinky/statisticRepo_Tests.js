var chai = require('chai')
    , expect = chai.expect
    , thinky = require(__dirname + '/../../../util/thinky')
    , r = thinky.r
    , _ = require('lodash')
    , repo = require(__dirname + '/../../../libs/repositories/thinky/statisticRepo')()
    , models = require(__dirname + '/../../../models/all')
    , fs = require('fs')
    , async = require('async')
    , shortid = require('shortid');

describe('Statistic Repository Tests', function () {

    describe('addStatistic() Function', function () {

        beforeEach(function (done) {
            models.Statistic.run(function (err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    async.each(doc, function (entry, callback) {
                        entry.deleteAll(null, callback);
                    }, function (err) {
                        if (!err) {
                            done();
                        }
                    });
                }
            });
        });

        afterEach(function (done) {
            models.Statistic.run(function (err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    async.each(doc, function (entry, callback) {
                        entry.deleteAll(null, callback);
                    }, function (err) {
                        if (!err) {
                            done();
                        }
                    });
                }
            });
        });

        it('create a new Statistic Entry', function (done) {
            var fakeId = shortid.generate();
            repo.addStatistic(fakeId, function (err, entry) {
                expect(err).to.be.null;
                //expect(entry).not.to.be.null;
                //expect(entry.target).to.be.equal('http://konekobox.de');
                models.Statistic
                    .then(function (statsEntrys) {
                        expect(statsEntrys).to.have.length(1);
                        expect(_.first(statsEntrys).shortId).to.be.equal(fakeId);
                        done();
                    })
                    .error(function (err) {
                        expect(err).to.be.null;
                    });
            });
        });
    });

});