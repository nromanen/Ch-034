var express = require("express"),
cors = function(req, res, next) {
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    res.header("Access-Control-Allow-Origin", "*");
    next();
};
module.exports = cors;