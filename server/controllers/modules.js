var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Module = require('../models/module');

router.get('/', function(req, res, next) {
console.log(req.params.id);
    Module
        .find({})
        .skip(req.query._start)
        .limit(req.query._limit)
        .exec(function(errr, modules) {
            res.header("X-Total-Count", modules.length);
            res.json(modules);
        });
});

router.get('/:id', function(req, res) {
    Module.findById(req.params.id, function(err, module) {
        res.json(module);
    });
});

module.exports = router;