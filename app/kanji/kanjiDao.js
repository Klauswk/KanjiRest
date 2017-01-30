'use strict'

let db;

require('./../mongo/mongoConn').getConnection().then(function (database) {
    db = database;
}, function (err) {
    console.log("Err in KanjiDao", err);
});


function getKanjiById(req, res) {
    if (!db) {
        res.status(500).json({ error: 'Internal server error' });
    } else {
        if (isNaN(req.params.kanji_id)) {
            res.status(400).json({error:"Id must be an number"});
        } else {
            db.collection("kanjis").findOne({ "ID": parseInt(req.params.kanji_id) }, function (err, item) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    if (!item) {
                        res.status(200).json({});
                    } else {
                        res.status(200).json(item);
                    }
                }
            });
        }
    }
};

function getKanjiByTranslation(req, res) {
    if (!db) {
        res.status(500).json({ error: 'Internal server error' });
    } else {
        db.collection("kanjis").find({
            $or: [
                { "Translation of On-reading": { '$regex': req.params.translation, '$options': 'i' } },
                { "Translation of Kun-reading": { '$regex': req.params.translation, '$options': 'i' } }
            ]
        }).toArray(function (err, items) {
            if (err) {
                res.status(500).json(err);
            } else {
                if (!items) {
                    res.status(200).json([]);
                } else {
                    res.status(200).json(items);
                }
            }
        });
    }
};

module.exports = {
    getKanjiById: getKanjiById,
    getKanjiByTranslation: getKanjiByTranslation
};