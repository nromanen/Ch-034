var low = require('lowdb');
var jsonServer = require('json-server');

var db = low('db.json');
var server = jsonServer.create();
var router = jsonServer.router(db.object);
/*
router.render = function(req,res) {
    setTimeout((function() {res.jsonp(
   res.locals.data
  )}), 2000);};*/

server.use(jsonServer.defaults());
server.use(router);

server.listen(3000);

