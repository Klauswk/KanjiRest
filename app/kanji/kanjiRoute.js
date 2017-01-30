'use strict'

let kanjiDao = require('./kanjiDao');

module.exports = function (app) {
    app.route('/kanji/id/:kanji_id').get(kanjiDao.getKanjiById);
    
    app.route('/kanji/translation/:translation').get(kanjiDao.getKanjiByTranslation);
}