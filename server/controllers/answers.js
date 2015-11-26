var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Answer = require('../models/answer');

router.post("/", function(req, res) {
    console.log(req.body);
    var answer = new Answer({ 
        num        : req.body.id,
        _course    : req.body._course,
        _module    : req.body._module,
        userAnswer : req.body.userAnswer,
    });

    answer.save(function(err) {
        if (err) throw err;
        console.log('Answer saved successfully');
        return res.json({ success: true });
    });
});

module.exports = router;