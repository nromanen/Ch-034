var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Module = require("../models/module"),
    Answer = require("../models/answer");

router.post("/", function(req, res) {
    if (req.body.data){
        req.body.data.forEach(function(values){
            var answer = new Answer({ 
                num        : values.id,
                _course    : values._course,
                _module    : values._module,
                _user      : req.body._user,
                userAnswer : values.userAnswer,
            }); 
            answer.save();
        });
        Module.findOneAndUpdate({"_id": req.body.data[0]._module}, {$set: {"available": false}}, function(err, module) {
            if (err) return err;
        }); 
    }

    return res.json({ success: true });
});

module.exports = router;