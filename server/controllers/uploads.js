var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    busboy = require('connect-busboy'),
    bodyParser = require('body-parser');

router.post('/image', function(req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        var fstream = fs.createWriteStream('./server/uploads/images/' + filename); 
        file.pipe(fstream);
        fstream.on('close', function () {
            res.json({
                "uploaded": 1,
                "fileName": filename,
                "url": req.serverUrl + "/uploads/images/"+filename
            })
        });
    });
});
router.post('/resource', function(req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        var fstream = fs.createWriteStream('./server/uploads/resources/' + filename); 
        file.pipe(fstream);
        fstream.on('close', function () {
            res.json({
                "uploaded": 1,
                "fileName": filename,
                "url": req.serverUrl + "/uploads/resources/"+filename
            })
        });
    });
});
module.exports = router