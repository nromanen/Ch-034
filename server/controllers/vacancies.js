var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Vacancy = require('../models/vacancy');

router.post('/', function(req, res) {
  
    var Vacancy = new Vacancy({ 
        name: req.body.name,
    });

    Vacancy.save(function(err) {
        if (err) throw err;

        console.log('Vacancy saved successfully');
        res.json({ success: true });
    });
});

router.put('/:id', function(req, res) {
    Vacancy.findByIdAndUpdate(req.param.id, {$set: {name: req.body.name}}, function(err, vacancy) {
      if (err) return handleError(err);
      res.send(vacancy);
    });
});

router.get('/', function(req, res) {
    Vacancy.find({}, function(errr, vacancies) {
        res.json(vacancies);
    });
});

router.get('/:id', function(req, res) {
    Vacancy.findById(req.param.id, function(err, vacancy) {
        res.json(vacancy);
    });
});

module.exports = router