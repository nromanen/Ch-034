var express = require("express"),
    router = express.Router({mergeParams: true}),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Variant = require("../models/variant");

router.post("/", function(req, res) {  
    var variant = new Variant({
        name     : req.body.name,
        isCorrect: req.body.isCorrect,
        _question: req.params.questionId
    });

    variant.save(function(err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});
router.delete("/:id", function(req, res) {
    Variant.findByIdAndRemove({_id: req.params.id}, function(err) {
        if (err) throw err;
        return res.json({success: true, message: "Variant deleted successfully"});
    });
});
router.put("/:id", function(req, res) {
    Variant.findByIdAndUpdate({_id: req.params.id}, {name: req.body.name, isCorrect: req.body.isCorrect}, function(err, variant) {
      if (err) return handleError(err);
      return res.json(variant);
    });
});
router.get("/", function(req, res) {
    Variant.find({"_question": req.params.questionId})
        .populate("_question", "typeVariant")
        .sort("num")
        .exec(function(err, variant) {
            if (err) throw err;
            return res.json(variant);
        });
});
router.get("/:id", function(req, res) {
    Variant.findById(req.params.id, function(err, variant) {
        if (err) throw err;
        return res.json(variant);
    });
});

module.exports = router;