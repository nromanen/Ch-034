var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Area = require('../models/area');

router.post('/', function(req, res) {
  
    var area = new Area({ 
        name: req.body.name,
    });

    area.save(function(err) {
        if (err) throw err;

        console.log('Area saved successfully');
        res.json({ success: true });
    });
});

router.put('/:id', function(req, res) {
    Area.findByIdAndUpdate(req.param.id, {$set: {name: req.body.name}}, function(err, area) {
      if (err) return handleError(err);
      res.send(area);
    });
});

router.get('/', function(req, res) {
    Area.find({}, function(errr, areas) {
        res.json(areas);
    });
});

router.get('/:id', function(req, res) {
    Area.findById(req.param.id, function(err, area) {
        res.json(area);
    });
});

module.exports = router