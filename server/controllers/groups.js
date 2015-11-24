var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Group = require('../models/group');

router.post('/', function(req, res) {
  
    var group = new Group({ 
        name: req.body.name,
    });

    group.save(function(err) {
        if (err) throw err;

        console.log('Group saved successfully');
        res.json({ success: true });
    });
});

router.put('/:id', function(req, res) {
    Group.findByIdAndUpdate(req.param.id, {$set: {name: req.body.name}}, function(err, group) {
      if (err) return handleError(err);
      res.send(group);
    });
});

router.get('/', function(req, res) {
    Group.find({}, function(errr, groups) {
        res.json(groups);
    });
});

router.get('/:id', function(req, res) {
    Group.findById(req.param.id, function(err, group) {
        res.json(group);
    });
});

module.exports = router