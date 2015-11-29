var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    
    User = require("../models/user"),
    Profile = require("../models/profile");

router.post("/", function(req, res, next) {
    Profile.findOneAndUpdate({_user: req.authUser._id}, req.body, {new: true},
    function(error, profile) {
        if (error) throw error;
        return res.json({success: true, profile: profile});
    });
    console.log(req.body);
});

module.exports = router;