var express = require("express"),
    router = express.Router({mergeParams: true}),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Question = require("../models/question");

var pageAble = function(req, res, next) {
    var data = res.locals.data;
    if (data.length === 0 ) {
        res.status(204);
        return res.json([{success: false}]);
    }
    res.header("X-Total-Count", data.length);

    Question
        .find({"_id": {$in: data}})
        .populate("_variants")
        .skip(req.query._start)
        .limit(req.query._limit)
        .exec(function(err, question) {
            if (err) throw err;
            
            return res.json(question);
        })
}

router.get("/", function(req, res, next) {
    var chain = Question.find({"_course": req.params.courseId, "_module": req.params.moduleId})
        .sort({"num": 1})
        .exec(function(error, question) {
            res.locals.data = question;
            next();
    });

}, pageAble );

module.exports = router;