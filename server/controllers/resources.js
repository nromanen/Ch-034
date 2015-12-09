var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Resource = require("../models/resource");

router.get("/", function(req, res) {
    Resource.find({}, function(err, resources) {
        if (err) throw err;
        return res.json(resources);
    });
});

module.exports = router