var chai = require('chai')
    , expect = chai.expect
    , thinky = (__dirname + '/../../../util/thinky')
    , r = thinky.r
    , _ = require('lodash')
    , repo = require(__dirname + '/../../../libs/repositories/thinky/shortUrlRepo')()
    , models = require(__dirname + '/../../../models/all')
    , fs = require('fs')
    , async =  require('async');

describe('ShortUrl Repository Tests', function () {

    describe('createNew() Function', function () {

        afterEach(function (done) {
            models.ShortUrl.run(function (err, doc) {
                if(err){
                    console.log(err);
                }else{
                    async.each(doc, function (entry,callback) {
                        entry.deleteAll(null,callback);
                    }, function (err) {
                        if(!err){
                            done();
                        }
                    });
                }
            });
        });

        it('create a new shortUrl', function (done) {
            repo.createNew('http://konekobox.de', function (err, entry) {
                expect(err).to.be.null;
                expect(entry).not.to.be.null;
                expect(entry.target).to.be.equal('http://konekobox.de');
                done();
            });
        });

        it('does not create a new shortUrl | provided URL is a invalid URL', function (done) {
            repo.createNew('http://konekoboxde', function (err, entry) {
                expect(err).not.to.be.null;
                expect(err.message).to.be.equal("ValidationInvalidUrl");
                expect(entry).to.be.null;
                done();
            });
        });
    });

    describe('getById() Function', function () {
        var testShortUrlInDB;

        beforeEach(function (done) {
            var testShortUrl = new models.ShortUrl({target: 'http://google.com'});
            testShortUrl.save().then(function (shortUrl) {
                testShortUrlInDB = shortUrl;
                done();
            });
        });

        afterEach(function (done) {
            models.ShortUrl.run(function (err, doc) {
                if(err){
                    console.log(err);
                }else{
                    async.each(doc, function (entry,callback) {
                        entry.deleteAll(null,callback);
                    }, function (err) {
                        if(!err){
                            done();
                        }
                    });
                }
            });
        });

        it('get a shorturl with a existing id', function (done) {
            repo.getById(testShortUrlInDB.id, function (err, entry) {
                expect(err).to.be.null;
                expect(entry).not.to.be.null;
                expect(entry.target).to.be.equal(testShortUrlInDB.target);
                done();
            });
        });

        it('get nothing with a non existing id', function (done) {
            repo.getById(testShortUrlInDB.id+1, function (err, entry) {
                expect(err).not.to.be.null;
                expect(err.message).to.be.equal('ModelIdNotFound');
                expect(entry).to.be.null;
                done();
            });
        });
    });
});