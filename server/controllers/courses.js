var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Course = require('../models/course'),
    User = require('../models/user');

var pageAble = function(req, res, next) {
    var data = res.locals.data,
        length,
        countChain;

    chain = Course
        .find({"_id": {$in: data}});

    if (req.query.subscribed) {
        chain
            .and([
                {"_id": {$in: data}},
                {"_id": {$in: req.authUser._courses}}
            ])
    }
    if (req.authUser.role == 0) {
        var today = new Date();
        chain.and([{"isPublished": true}, {"publish_at": {"$lte": today}},{"unpublish_at": {"$gte": today}}])
    }
    countChain = Object.create(chain);
    countChain.count();

    chain
        .skip(req.query._start)
        .limit(req.query._limit)
        .sort("-publish_at")
        .lean();

    Promise.all([
        countChain.exec(),
        chain.exec()
        ]).then(function(results) {
            length = results[0];
            if (length === 0 ) {
                res.status(204);
                return res.json([{success: false, message: "No content"}]);
            }
            res.header("X-Total-Count", length);
            courses = results[1];

            for (course in courses) {
                req.authUser._courses.indexOf(courses[course]._id) !== -1 ? 
                    courses[course].subscribed = true :
                    courses[course].subscribed = false;
            }

            return res.json(courses);
        }).catch(function(err) {
            if (err) next(err);
        });
}

router.get("/", function(req, res, next) {
    var chain = Course.find().exec(function(err, courses) {
        res.locals.data = courses;
        next();
    });
}, pageAble );

router.get("/filter", function(req, res, next) {
    
    if (req.query.s) {
        var searchString = req.query.s.split(" "),
            regexString = "",
            q;

        for (var i = 0; i < searchString.length; i++)
        {
            regexString += searchString[i];
            if (i < searchString.length - 1) regexString += "|";
        }

        q = new RegExp(regexString, "ig");
        Course
            .find()
            .or([{"name": {$regex: q}}, {"description": {$regex: q}}, {"schedule": {$regex: q}}])
            .select("-area -groups")
            .exec(function(err, courses) {
                res.locals.data = courses;
                next();
            })
            
    }
    if (req.query.area || req.query.group) {
        
        var areaQ = [].concat(req.query.area ? req.query.area : []), 
            groupQ = [].concat(req.query.group ? req.query.group : []);

        Course
            .find()
            .populate("area", null,  {"name": {$in: areaQ}})
            .populate("groups", null,  {"name": {$in: groupQ}})
            .exec(function(err, courses) {
                if (err) throw err;
                courses = courses.filter(function(course) {
                    if (areaQ.length !== 0 && groupQ.length !== 0) {
                        return course.area && course.groups.length
                    } else
                    if (areaQ.length !== 0) {
                        return course.area
                    } else
                    if (groupQ.length !== 0) {
                        return course.groups.length
                    }
                })
                res.locals.data = courses;
                next();

        });
        
    }
}, pageAble);

router.get("/:id", function(req, res, next) {
    Course
        .findById(req.params.id, function(err, course) {
            if (err) next(err);
            req.authUser._courses.indexOf(course._id) !== -1 ?
                course.subscribed = true :
                course.subscribed = false;

            res.json(course.toObject());
        });
});

router.post('/subscribe', function(req, res, next){
    User
        .findOneAndUpdate({_id: req.authUser._id}, {$push: {_courses: req.body.id}}, function(err, user){
            if (err){
                next(err);
            } else {
                return res.json({
                    success: true,
                    message: 'Ви успішно підписалися на курс "' + req.body.name + '"',
                });
            }

        });
});

router.delete('/subscribe', function(req, res, next){
    User
        .findOneAndUpdate({_id: req.authUser._id}, {$pull: {_courses: req.body.id}}, function(err, user){
            if (err){
                next(err);
            } else {
                return res.json({
                    success: true,
                    message: 'Ви успішно відписалися від курсу "' + req.body.name + '"',
                });
            }

        });
});

module.exports = router;