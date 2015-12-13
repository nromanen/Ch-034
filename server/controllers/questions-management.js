var express = require("express"),
    router = express.Router({mergeParams: true}),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Question = require("../models/question");

router.get("/", function(req, res) {
    Question
        .find({"_test": req.params.testId})
        .sort({"num": 1})
        .exec(function(error, test) {
            if (error) throw error;
            return res.json(test);
    });
});

router.get("/:id", function(req, res) {
    Question.findById(req.params.id, function(err, question) {
        if (err) throw err;
        return res.json(question);
    });
});

router.delete("/:id", function(req, res) {
    Question.findByIdAndRemove({_id: req.params.id}, function(err) {
        if (err) throw err;
        return res.json({success: true, message: "Question deleted successfully"});
    });
});

router.post("/", function(req, res) {
    var question = new Question({ 
        name   : req.body.name,
        _test: req.params.testId
    });

    question.save(function(err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});

router.put("/:id", function(req, res) {
    Question.findByIdAndUpdate({_id: req.params.id}, {name: req.body.name, typeVariant: req.body.typeVariant}, function(err, question) {
      if (err) return handleError(err);
      return res.json(question);
    });
});

module.exports = router;