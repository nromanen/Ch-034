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
    var users = db("users");
    var email = req.body.email;
    
    if (users.find({email: email})) {
        res.status(409);
        res.send(JSON.stringify({message: "User with this email is already registered."}));
        return false;
    }

    res.status(200);
    res.send(JSON.stringify({message: "success"}));

});
server.get("/courses/:courseId/modules/:id", function(req, res) {
    var response = db("modules").find({id: parseInt(req.params.id), courseId: parseInt(req.params.courseId)});
    if (response) {
        res.send(JSON.stringify(response));
    } else {
        res.status(404);
        res.send(JSON.stringify({message: "Not Found"}));
    }
    
});
server.get("/courses/filter", function(req, res) {
    var collection = db("courses"),
        areas = [], groups = [], queries = [], results = [];
    if (req.query.area) {
        areas = db("areas").chain().filter(function(n) {
            return req.query.area.indexOf(n.name) != -1;
        }).reduce(function(result, n, key, arr) {
            result[key] = n.id;
            return result;
        }, {}).map(function(val, i){
            return val;
        }).value();
        areas ? queries["areas"] = areas : false;
    }

    if (req.query.group) {
        groups = db("course_groups").chain().filter(function(n){
            return req.query.group.indexOf(n.name) != -1;
        }).sortBy("courseId").reduce(function(result, n, key, arr ) {
            if (req.query.group instanceof Array) {
                if (arr[key+1] && n.courseId == arr[key+1].courseId) {
                    result[n.courseId] = n.courseId;
                }
            } else {
                result[n.courseId] = n.courseId;
            }
            return result;
        }, {}).map(function(val, i){
            return val;
        }).value();
        groups ? queries["groups"] = groups : false;
    }
    
    if (queries.hasOwnProperty) {
        results = collection.chain()
            .filter(function(n) {
                if (queries["areas"]) {
                    return queries["areas"].indexOf(n.areaId) != -1
                    
                } else return true;
            })
            .filter(function(n){
                if (queries["groups"]) {
                    return queries["groups"].indexOf(n.id) != -1
                } else return true;
            })
            .value();  
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.jsonp(JSON.stringify(results, null, 3));
    
});
server.use(router);

server.listen(3000);

