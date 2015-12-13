var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    fs = require('fs'),
    busboy = require('connect-busboy'),
    mongoose = require("mongoose"),
    ReportForm = require("../models/reportmessage");

router.post("/", function(req, res) {
    var reportMessage = {};
    req.pipe(req.busboy);
    req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        reportMessage[fieldname] = val;
    });

    req.busboy.on('file', function(fieldname, file, filename) {
        var fstream = fs.createWriteStream('./server/reports/' + filename); 
        file.pipe(fstream);
        fstream.on('close', function () {
            reportMessage.file = req.serverUrl + "/reports/"+filename;
            var message = new ReportForm(reportMessage);
                message.save(function(err) {
                    if (err) throw err;
                    return res.json({ success: true });
            });
        });
    });
});

module.exports = router