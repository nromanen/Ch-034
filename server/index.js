var low = require('lowdb');
var jsonServer = require('json-server');
var express = require('json-server/node_modules/express');
var bodyParser = require('json-server/node_modules/body-parser');

var db = low('db.json');
var server = jsonServer.create();

var router = jsonServer.router(db.object);
/*
router.render = function(req,res) {
    setTimeout((function() {res.jsonp(
   res.locals.data
  )}), 2000);};*/

server.use(jsonServer.defaults());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post("/check_email", function(req, res) {
    var users = db("users"),
        email = req.body.email;
    
    if (users.find({email: email})) {
        res.status(409);
        res.send(JSON.stringify({message: "User with this email is already registered."}));
        return false;
    }

    res.status(200);
    res.send(JSON.stringify({message: "success"}));

});

server.get("/courses/:courseId/modules/:id", function(req, res) {
    var response = db("modules").chain().find({
        id: parseInt(req.params.id), 
        courseId: parseInt(req.params.courseId)
    });
    if (response) {
        res.send(JSON.stringify(response.value()));
    } else {
        res.status(404);
        res.send(JSON.stringify({message: "Not Found"}));
    }
    
});

server.get("/courses/filter", function(req, res) {
    var collection = db("courses"),
        results = collection.chain(),
        areaQ = [].concat(req.query.area ? req.query.area : []), 
        groupQ = [].concat(req.query.group ? req.query.group : []), 
        _start = req.query._start,
        _end = req.query._end,
        _limit = req.query._limit,
        areas, groups;

    if (areaQ.length >= 1) {
        areas = db("areas").chain().filter(function(n) {
            return areaQ.indexOf(n.name) != -1;
        }).reduce(function(result, n, key, arr) {
            result[key] = n.id;
            return result;
        }, {}).map(function(val, i){
            return val;
        }).value();
        
        results = results.filter(function(n){
            return areas.indexOf(n.areaId) !== -1;
        });
    }

    if (groupQ.length >= 1) {
        groups = db("groups").chain().filter(function(n) {
            return groupQ.indexOf(n.name) !== -1;
        }).reduce(function(result, n, key, arr) {
            result[key] = n.id;
            return result;
        }, {}).map(function(val, i) {
            return val;
        }).value();

        var courses_groups = db("course_groups").chain().filter(function(n) {
            return groups.indexOf(n.groupId) !== -1;
        }).reduce(function(result, n, key, arr) {
            result[key] = n.courseId;
            return result;
        }, {}).map(function(val, i) {
            return val;
        }).value();

        results = results.filter(function(n){
            return courses_groups.indexOf(n.id) !== -1;
        });
    }

    if (_end || _limit) {
      res.setHeader('X-Total-Count', results.size());
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    }

    _start = parseInt(_start, 10) || 0;

    if (_end) {
      _end = parseInt(_end, 10);
      results = results.slice(_start, _end);
    } else if (_limit) {
      _limit = parseInt(_limit, 10);
      results = results.slice(_start, _start + _limit);
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.jsonp(results.value());
});

server.use(router);
server.listen(3000);