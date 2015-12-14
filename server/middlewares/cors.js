var express = require("express"),
cors = function(req, res, next) {
    req.serverUrl = req.protocol + '://' + req.get('host');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    next();
};
module.exports = cors;