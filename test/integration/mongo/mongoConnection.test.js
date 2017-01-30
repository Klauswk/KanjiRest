'use strict'

let mongoConn = require("./../../../app/mongo/mongoConn");
let expect = require('expect.js');

describe('Integration Test, mongo connection', function () {

    it('No connection active', function () {
        expect(mongoConn.isConnected()).to.be(false);
    });

    it('Connect to database and set isConnected to True',function(done){
        this.timeout(10000);
        mongoConn.getConnection().then(function(database){
            expect(database).not.to.be(undefined);
            expect(mongoConn.isConnected()).to.be(true);
            done();
        },function(err){
            expect().fail(err);
            done();
        })
    });
});