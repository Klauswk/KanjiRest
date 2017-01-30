'use strict'

const mongo = require('mongodb').MongoClient;

let dbConn = process.env.dbConn;

if (!dbConn) {
    let fs = require('fs');
    dbConn = JSON.parse(fs.readFileSync('data.json', 'utf8')).dbConn;
}

let db;

module.exports = {
    isConnected: isConnected,
    getConnection: getConnection
};

function getConnection() {
    let promise = new Promise(function (resolve, reject) {
        if (isConnected()) {
            resolve(db);
        } else {
            mongo.connect(dbConn, (err, database) => {

                if (err) {
                    reject(err);
                } else {
                    db = database;
                    resolve(db);
                }
            });
        }
    })
    return promise;
}

function isConnected() {
    return !!db;
}