'use strict'

function getKanjiById(req, res) {
    
    res.send('Getting kanjiID: ' + req.params.kanji_id);
};

module.exports = {
    getKanjiById: getKanjiById
};