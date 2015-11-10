var express = require('express'),
cors = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    next();
};
module.exports = cors;