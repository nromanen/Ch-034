var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    ReportMessage = require("../models/ReportMessage");

router.post("/", function(req, res) {

    var reportMessage = new ReportMessage({ 
        email: req.body.email,
        name: req.body.name,
        text: req.body.text,
        file: req.body.file
    });

    reportMessage.save(function(err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});

module.exports = router