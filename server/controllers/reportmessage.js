var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    ReportForm = require("../models/reportmessage");

router.post("/", function(req, res) {

    var reportMessage = new ReportForm({ 
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