'use strict'

const mongo = require('mongodb').MongoClient;

let dbConn = process.env.dbConn;

if (!dbConn) {
  let fs = require('fs');
  dbConn = JSON.parse(fs.readFileSync('data.json', 'utf8')).dbConn;
}

mongo.connect(dbConn, (err, database) => {

  if (err) {
    console.log(err);
  } else {
    const server = require("./server")();
  }
})


