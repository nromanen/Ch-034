var express = require("express"),
    router = express.Router({mergeParams: true}),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Test = require("../models/test");

router.get("/", function(req, res) {
    if(req.params.courseId && req.params.moduleId){
        Test
            .findOne({"_course": req.params.courseId, "_module": req.params.moduleId})
            .exec(function(error, test) {
                if (error) throw error;
                return res.json(test);
        });
    }
    else if(req.params.moduleId){
        Test
            .find({"_module": req.params.moduleId})
            .sort({"num": 1})
            .exec(function(error, test) {
                if (error) throw error;
                return res.json(test);
        });
    }
    else{
        Test
            .find({})
            .sort({"num": 1})
            .exec(function(error, test) {
                return res.json(test);
        });
    }

});

router.get("/:id", function(req, res) {
    Test.findById(req.params.id, function(err, test) {
        if (err) throw err;
        return res.json(test);
    });
});

router.delete("/:id", function(req, res) {
    Test.findByIdAndRemove({_id: req.params.id}, function(err) {
        if (err) throw err;
        return res.json({success: true, message: "Test deleted successfully"});
    });
});

router.post("/", function(req, res) {
    var test = new Test({ 
        name   : req.body.name,
        _module: req.params.moduleId
    });

    test.save(function(err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});

router.put("/:id", function(req, res) {
    Test.findByIdAndUpdate({_id: req.params.id}, {name: req.body.name, estimateMethod: req.body.estimateMethod}, function(err, test) {
      if (err) return handleError(err);
      return res.json(test);
    });
});

module.exports = router;