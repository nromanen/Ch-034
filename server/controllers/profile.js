var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    
    User = require("../models/user"),
    Profile = require("../models/profile");

router.get("/:id", function(req, res, next) {

    Profile
    .findById.exec(function(err, user) {
    })
});

module.exports = router;