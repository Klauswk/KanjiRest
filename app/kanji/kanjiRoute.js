'use strict'

let kanjiDao = require('./kanjiDao');

module.exports = function (app) {
    app.route('/kanji/id/:kanji_id').get(kanjiDao.getKanjiById);
    
    app.route('/kanji/translation/:translation').get(kanjiDao.getKanjiByTranslation);

    app.route('/kanji/stroke/:strokeNumber').get(kanjiDao.getKanjiByStrokeNumber);

    app.route('/kanji/grade/:grade').get(kanjiDao.getKanjiByGrade);
    
    app.route('/kanji/kanji/:kanji').get(kanjiDao.getKanjiByKanji);
}