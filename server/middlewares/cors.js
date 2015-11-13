var express = require('express'),
cors = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication, x-access-token");
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    next();
};
module.exports = cors;