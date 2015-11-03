var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Course = require('../models/course');

router.post('/', function(req, res) {
  
    var course = new Course({ 
        name: req.body.name,
        description: req.body.description,
        startAt: req.body.startAt,
        endAt: req.body.endAt,
        duration: req.body.duration,
        schedule: req.body.schedule,
        minStudents: req.body.minStudents,
        applicantsNumber: req.body.applicantsNumber,
        image: req.body.image,
        area: java._id,
        groups: [early._id, evening._id],
    });

    course.save(function(err) {
        if (err) throw err;

        console.log('Course saved successfully');
        res.json({ success: true });
    });
});

router.put('/:id', function(req, res) {
    Course.findByIdAndUpdate(req.param.id, {$set: {}}, function(err, course) {
      if (err) return handleError(err);
      res.send(course);
    });
});

router.get('/', function(req, res) {
    
    Course
        .find({})
        .skip(req.query._start)
        .limit(req.query._limit)
        .exec(function(errr, courses) {
            res.header("X-Total-Count", courses.length);
            res.json(courses);
        });
});

router.get('/:id', function(req, res) {
    Course.findById(req.params.id, function(err, course) {
        res.json(course);
    });
});

router.use('/:id/modules/', function(req, res) {
    Course
        .findById(req.params.id)
        .populate('_modules')
        .exec(function(err, course) {
            if (err) return handleError(err)
            res.json(course._modules);
        });
});
module.exports = router;