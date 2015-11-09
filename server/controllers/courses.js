var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Course = require('../models/course'),
    Module = require('../models/module');


var pageAble = function(req, res, next) {
    if (res.locals.courses.length === 0 ) {
        res.status(204);
        return res.json([{success: false}]);
    }

    var totalCount, query = Course.find(res.locals.courses);
    query.count(function(err, count) {
        if (err) throw err;
        totalCount = count;
    })
        query
        .skip(req.query._start)
        .limit(req.query._limit)
        .exec(function(err, courses) {
            if (err) throw err;
            res.header('X-Total-Count', totalCount);
            return res.json(courses);
        })
}
/*
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
});*/

router.get('/', function(req, res, next) {
    Course
        .find()
        .exec(function(err, courses) {
            if (err) throw err;
            res.locals.courses = courses;
            next();
        });
}, pageAble);

router.get('/filter', function(req, res, next) {
    if (req.query.s) {
        var terms = req.query.s.split(' ');

        var regexString = "";

        for (var i = 0; i < terms.length; i++)
        {
            regexString += terms[i];
            if (i < terms.length - 1) regexString += '|';
        }

        var q = new RegExp(regexString, 'ig');
        Course
            .find(res.locals.courses)
            .or([{'name': {$regex: q}}, {'description': {$regex: q}}, {'schedule': {$regex: q}}])
            .select('-area -groups')
            .exec(function(err, courses) {
                if (err) throw err;
                res.locals.courses = courses;
                next();
            })
    }
}, pageAble);

router.get('/', function(req, res, next) {
    if (req.query.s) {

        var q = new RegExp('^'+req.query.s+'$', "i");
        Course
            .find(req.locals.courses)
            .or([{'title': q}, {'description': q}, {'schedule': q}])
            .select('-area -groups')
            exec(function(err, courses) {
                if (err) throw err;
                req.locals.courses = courses;
            })
    }
}, pageAble);

router.get('/:id', function(req, res) {
    Course
        .findById(req.params.id, function(err, course) {
            res.json(course);
        });
});
router.get('/:courseId/modules/:moduleId', function(req, res) {
    Module
        .findOne({"_course": req.params.courseId, "_id": req.params.moduleId})
        .populate('_course', '_id')
        .populate('_resources')
        .exec(function(error, module) {
            if (error) throw error
            res.json(module);
        })
});
router.get('/:id/modules', function(req, res) {
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