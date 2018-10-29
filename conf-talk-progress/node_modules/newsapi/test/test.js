'use strict';

require('dotenv').config();

let should = require('should'),
  NewsAPI = require('../dist/index');

if (!process.env.API_KEY) throw new Error('No API Key specified. Please create an environment variable named API_KEY');
let newsapi = new NewsAPI(process.env.API_KEY);

describe('NewsAPI', function () {
  describe('V1', function () {
    describe('Sources', function () {
      it('should return "ok" and a list of sources', function (done) {
        newsapi.sources().then(res => {
          res.status.should.equal('ok');
          should.exist(res.sources);
          done();
        }).catch(done);
      });
  
      it('should return "ok" and a list of sources using a callback', function (done) {
        newsapi.sources((err, res) => {
          if (err) {
            return done(err);
          }
          res.status.should.equal('ok');
          should.exist(res.sources);
          done();
        });
      });
  
      it('should return "ok" and a list of sources using a callback and empty params object', function (done) {
        newsapi.sources({}, (err, res) => {
          if (err) {
            return done(err);
          }
          res.status.should.equal('ok');
          should.exist(res.sources);
          done();
        });
      });
    });
  
    describe('Articles', function () {
      it('should return "ok" and a list of articles for a valid source', function (done) {
        const sourceId = 'buzzfeed';
        newsapi.articles({
          source: sourceId
        }).then(articlesRes => {
          articlesRes.status.should.equal('ok');
          should.exist(articlesRes.articles);
          done();
        }).catch(done);
      });
  
      it('should return "ok" and a list of articles for a valid source using a callback', function (done) {
        const sourceId = 'buzzfeed';
        newsapi.articles({
          source: sourceId
        }, (err, articlesRes) => {
          if (err) {
            return done(err);
          }
          articlesRes.status.should.equal('ok');
          should.exist(articlesRes.articles);
          done();
        });
      });

      it('Should throw an error if no source is provided', function (done) {
        newsapi.articles().then(res => {
          done(new Error('Should have thrown an error'));
        }).catch(err => {
          done();
        });
      });
    });
  });

  describe('V2', function () {
    describe('sources', function () {
      it('Should return "ok" and a list of sources', function (done) {
        newsapi.v2.sources().then(res => {
          res.status.should.equal('ok');
          should.exist(res.sources);
          done();
        }).catch(done);
      });
    });

    describe('top-headlines', function () {
      it('Should return "ok" and a list of top headlines', function (done) {
        newsapi.v2.topHeadlines({
          language: 'en'
        }).then(res => {
          res.status.should.equal('ok');
          should.exist(res.articles);
          done();
        }).catch(done);
      });

      it('Should return "ok" and a list of top headlines using a callback', function (done) {
        newsapi.v2.topHeadlines({
          language: 'en'
        }, (err, res) => {
          if (err) {
            return done(err);
          }
          res.status.should.equal('ok');
          should.exist(res.articles);
          done();
        });
      });

      it('Should default to english language if no options are provided and return a list of top headlines', function (done) {
        newsapi.v2.topHeadlines().then(res => {
          res.status.should.equal('ok');
          should.exist(res.articles);
          done();
        }).catch(done);
      });

      it('Should throw an error if all required params are missing', function (done) {
        newsapi.v2.topHeadlines({})
          .then(res => {
            done(new Error('This should have thrown an error'));
          })
          .catch((err) => {
            done();
          });
      });
    });

    describe('everything', function () {
      it('Should return "ok" and a list of articles', function (done) {
        newsapi.v2.everything({
          sources: 'bbc-news'
        }).then(res => {
          res.status.should.equal('ok');
          should.exist(res.articles);
          done();
        }).catch(done);
      });

      it('Should not cache results if noCache is on', function (done) {
        newsapi.v2.everything({
          sources: 'bbc-news'
        }, {
          noCache: true,
          showHeaders: true
        }).then(res => {
          res.headers.get('x-cached-result').should.equal('false');
          res.body.status.should.equal('ok');
          should.exist(res.body.articles);
          done();
        }).catch(done);
      });

      it('Should throw an error if all required params are missing', function (done) {
        newsapi.v2.everything({})
          .then(res => {
            done(new Error('This should have thrown an error'));
          })
          .catch((err) => {
            done();
          });
      });
    });
  });
});
