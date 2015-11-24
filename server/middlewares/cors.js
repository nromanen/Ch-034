var express = require('express'),
cors = function(req, res, next) {
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    next();
};
module.exports = cors;