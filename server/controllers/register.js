var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    
    User = require("../models/user"),
    Profile = require("../models/profile");

router.post("/", function(req, res, next) {
        newUser = new User({
            'email': req.body.email,
            'password': req.body.password,
            'name.first': req.body.name,
            'name.last': req.body.surname
        });

    User
    .findOne({"email": newUser.email})
    .exec(function(err, user) {
        if (err) next(err);
        if (user) {
            return res
                .status(401)
                .json({"success": false, "message": "This email is already registered"});
        } else {
            newUser.save(function(err, user) {
                if (err) next(err);
                    var userProfile = new Profile({
                        _user: user._id,
                        email: req.body.email,
                        name: {
                            first: req.body.name,
                            last: req.body.surname
                        },
                        avatar: req.body.avatar,
                        social: {
                            phone: req.body.phone,
                            skype: req.body.skype,
                            linkedin: req.body.linkedin,
                            fb: req.body.fb,
                            vk: req.body.vk
                        },
                    });

                    userProfile.save(function(err, profile) {
                        if (err) throw err
                        return res
                            .type("application/json")
                            .status(200)
                            .send(JSON.stringify({"success": true, "profile": profile, "message": "registration successufull"}));
                    });
                })
            }
    })
})
router.post("/check_email", function(req, res, next) {
    User
        .findOne({"email": req.body.email})
        .exec(function(err, user) {
            if (err) next(err);
            if (user) {
                return res
                    .status(401)
                    .json({"success": false, "message": "This email is already registered"});
            } else {
                return res
                    .status(200)
                    .json({"success": true,"message": "This email is free to use"});
            }
        })
})

module.exports = router;