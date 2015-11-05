var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Course = require('../models/course'),
    Module = require('../models/module');

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

router.get('/', function(req, res, next) {
    var _start = req.query._start ? req.query._start : null,
        _limit = req.query._limit ? req.query._limit : null,
        areaQ = [].concat(req.query.area ? req.query.area : []), 
        groupQ = [].concat(req.query.group ? req.query.group : []), 
        searchQ = req.query.s ? req.query.s : null;

    if (!(req.query.area || req.query.group || req.query.s)) {
        next();
        return;
    }

    console.log(areaQ);

        Course
            .find()
            .populate('_area')
            .where({'_area.name': 'Java'})

            .exec(function(errr, courses) {
                console.log(courses);
                res.header("X-Total-Count", courses.length);
                res.json(courses);
            });
});

router.get('/', function(req, res, next) {
    var _start = req.query._start ? req.query._start : null,
        _limit = req.query._limit ? req.query._limit : null;

    Course
        .find({})
        .populate('_area')
        .populate('_groups')
        .skip(_start)
        .limit(_limit)
        .exec(function(errr, courses) {
            res.header("X-Total-Count", courses.length);
            res.json(courses);
        });
});

router.get('/:id', function(req, res) {
    Course
        .findById(req.params.id, function(err, course) {
            res.json(course);
        });
});
router.use('/:id/modules/:moduleId', function(req, res) {
    Module
        .find({'_course': req.params.id})
        .exec(function(error, modules) {
            Module
                .findById(req.params.moduleId)
                .populate('_course', '_id')
                .populate('_resources')
                .exec(function(error, module) {
                    if (error) throw error
                    res.json(module);
                })
        });
});
router.use('/:id/modules', function(req, res) {
    console.log("match1");
    Module
        .find({'_course': req.params.id})
        .populate('_course', '_id')
        .sort({'_id': 1})
        .exec(function(error, modules) {
            res.json(modules);
        });
});

module.exports = router;