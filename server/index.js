var low = require('lowdb');
var jsonServer = require('json-server');

var db = low('db.json');
var server = jsonServer.create();
var router = jsonServer.router(db.object);

router.render = function(req, res) {
    console.log(req.method == "PUT");
    (req.method == "PUT" || req.method == "POST" || req.method == "DELETE") ? db.save() : false;
    res.jsonp(res.locals.data);
};

server.use(jsonServer.defaults());

server.use(router);
server.listen(3000);

