var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Course = require('../models/course'),
    Profile = require('../models/profile');

var pageAble = function(req, res, next) {
    var data = res.locals.data;
    if (data.length === 0 ) {
        res.status(204);
        return res.json([{success: false}]);
    }
    res.header("X-Total-Count", data.length);

    Course
        .find({"_id": {$in: data}})
        .skip(req.query._start)
        .limit(req.query._limit)
        .exec(function(err, courses) {
            if (err) throw err;
            
            return res.json(courses);
        })
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

        var chain = Course.find();
        if (areaQ.length !== 0 && groupQ.length !== 0) {
            chain.and([{"area.name": {$in: areaQ}}, {"groups.name": {$in: groupQ}}])
        } else
        if (areaQ.length !== 0) {
            chain.where("area.name").in(areaQ)
        } else
        if (groupQ.length !== 0) {
            chain.where("groups.name").in(groupQ)
        }
        chain.exec(function(err, courses) {
            if (err) throw err;
            res.locals.data = courses;
            next();
        })
    }
}, pageAble);

router.get("/:id", function(req, res) {
    Course
        .findById(req.params.id, function(err, course) {
            res.json(course);
        });
});

router.post('/subscribe', function(req, res, next){
    Profile
        .findOneAndUpdate({_user: req.authUser._id}, {$push: {_courses: req.body.id}}, {new: true}, function(err, profile){
            if (err){
                next(err);
            } else {
                return res.json({
                    authenticated: true,
                    message: 'Ви успішно підписалися на курс "' + req.body.name + '"',
                    profile: profile,
                    token: req.headers['x-access-token']
                });
            }

        });
});

router.delete('/subscribe', function(req, res, next){
    Profile
        .findOneAndUpdate({_user: req.authUser._id}, {$pull: {_courses: req.body.id}}, {new: true}, function(err, profile){
            if (err){
                next(err);
            } else {
                return res.json({
                    authenticated: true,
                    message: 'Ви успішно відписалися вд курсу "' + req.body.name + '"',
                    profile: profile,
                    token: req.headers['x-access-token']
                });
            }

        });
});

module.exports = router;