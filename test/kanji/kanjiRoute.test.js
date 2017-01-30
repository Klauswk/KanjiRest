'use strict'

let express = require('express');
let app = express();
require("./../../app/server")(app);
let request = require('supertest');
let expect = require('expect.js');

describe('Kanji Route Test', function () {
    it('Should return "Server Running message"', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
            
                expect(res.text).equal("Server Running!");
                done();
            });
    });
});