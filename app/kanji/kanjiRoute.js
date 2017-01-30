'use strict'

let kanjiDao = require('./kanjiDao');

module.exports = function (app) {
    app.route('/kanji/:kanji_id').get(kanjiDao.getKanjiById);
}