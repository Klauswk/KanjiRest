'use strict'

let kanjiDao = require('./kanjiDao');

module.exports = function (app) {
    app.route('/api/kanji/id/:kanji_id').get(kanjiDao.getKanjiById);
    
    app.route('/api/kanji/translation/:translation').get(kanjiDao.getKanjiByTranslation);

    app.route('/api/kanji/stroke/:strokeNumber').get(kanjiDao.getKanjiByStrokeNumber);

    app.route('/api/kanji/grade/:grade').get(kanjiDao.getKanjiByGrade);
    
    app.route('/api/kanji/kanji/:kanji').get(kanjiDao.getKanjiByKanji);
}