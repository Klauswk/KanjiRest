'use strict'

module.exports = function (app) {
    let mongoConnection = require("./mongo/mongoConn");

    let promise = new Promise(function (resolve, reject) {
        mongoConnection.getConnection().then(function (database) {
            if (!app) {
                let express = require('express');
                app = express();
            }

            let bodyParser = require('body-parser')
            require('./kanji/kanjiRoute')(app);
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.text());
            app.use(bodyParser.json({ type: 'application/json' }));

            app.use(function (req, res, next) {
                next();
            });

            app.get('/', function (req, res) {
                res.send('Server Running');
            });


            let server = app.listen(process.env.PORT || 8888, function () {
                console.log('Server working properly on ' + (process.env.PORT || 8888));
            });

            resolve(server);
        }, function (err) {
            reject(err);
        });
    });
    return promise;
}
