var low = require('lowdb');
var jsonServer = require('json-server');

var db = low('db.json');
var server = jsonServer.create();
var router = jsonServer.router(db.object);


server.use(jsonServer.defaults());

server.use(router);
server.listen(3000);

