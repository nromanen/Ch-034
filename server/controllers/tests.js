var express = require("express"),
    router = express.Router({mergeParams: true}),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Test = require("../models/test");

router.get("/", function(req, res) {
    Test
        .findOne({"_course": req.params.courseId, "_module": req.params.moduleId})
        .exec(function(error, test) {
            if (error) throw error;
            return res.json(test);
        });
});

module.exports = router;