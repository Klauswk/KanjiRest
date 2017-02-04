'use strict'

let express = require('express');
let app = express();
let server;
let request = require('supertest');
let expect = require('expect.js');

describe('Kanji Route Test', function () {

    beforeEach(function (done) {
        require('./../../../app/server')(app).then(function (ser) {
            server = ser;
            done();
        });
    });

    afterEach(function (done) {
        server.close(done);
    });

    it('Empty result with inexistent id', function (done) {
        request(app)
            .get('/kanji/id/9999')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                expect(responseObj).to.be.empty();
                done();
            });
    });

    it('Request error if id is not a number', function (done) {
        request(app)
            .get('/kanji/id/NOT_A_NUMBER')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                expect(responseObj.error).equal("Id must be an number");
                done();
            });
    });

    it('Return kanji with id 2', function (done) {
        request(app)
            .get('/kanji/id/2')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                expect(responseObj.ID).equal(2);
                done();
            });
    });

    it('inexistent word must return empty array', function (done) {
        request(app)
            .get('/kanji/translation/NOT_A_TRUE_WORD')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                expect(responseObj).to.be.empty();
                done();
            });
    });

    it('All results must contain "love" in translation', function (done) {
        request(app)
            .get('/kanji/translation/love')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                let result = responseObj.every(function (kanji) {
                    return kanji["Translation of On-reading"].indexOf("love") > -1 || kanji["Translation of Kun-reading"].indexOf("love") > -1
                });
                expect(result).equal(true);
                done();
            });
    });

    it('All results must contain "13" strokes', function (done) {
        request(app)
            .get('/kanji/stroke/13')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                let result = responseObj.every(function (kanji) {
                    return kanji["# of Strokes"] === 13
                });
                expect(result).equal(true);
                done();
            });
    });

    it('Stroke endpoint shouldn\'t accept characters', function (done) {
        request(app)
            .get('/kanji/stroke/oie')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                expect(responseObj.error).equal("Stroke number must be an number");
                done();
            });
    });

    it('All results must be grade 2', function (done) {
        request(app)
            .get('/kanji/grade/1')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                let result = responseObj.every(function (kanji) {
                    return kanji["Grades"] === 2
                });
                expect(result).equal(true);
                done();
            });
    });

    it('Grade endpoint shouldn\'t accept characters', function (done) {
        request(app)
            .get('/kanji/grade/oie')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                expect(responseObj.error).equal("Grade must be an number");
                done();
            });
    });

    /*it('The returned kanji must match the input', function (done) {
        request(app)
            .get("/kanji/kanji/愛")
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                console.log(res);

                //let responseObj = JSON.parse(res.text);
                //expect(responseObj.Kanji).equal("愛");
                done();
            });
    });*/

    it('Kanji endpoint shouldn\'t accept numbers', function (done) {
        request(app)
            .get('/kanji/kanji/123456')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                expect(responseObj.error).equal("Kanji must be an character");
                done();
            });
    });
});