var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("../models/user"),
    Profile = require("../models/profile");

router.post("/", function(req, res, next) {
        var data = {
            "email": req.body.email,
            "password": req.body.password,
            "name": req.body.name,
            "surname": req.body.surname
        };

    User
    .findOne({"email": data.email})
    .exec(function(err, user) {
        if (err) next(err);
        if (user) {
            return res
                .status(401)
                .json({"success": false, "message": "This email is already registered"});
        } else {
            var newUser = new User(data),
            userProfile = new Profile({
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
                avatar: req.body.avatar,
                social: {
                    phone: req.body.phone,
                    skype: req.body.skype,
                    linkedin: req.body.linkedin,
                    fb: req.body.fb,
                    vk: req.body.vk
                }
            });
            newUser._profile = userProfile._id;
            userProfile._user = newUser._id;
            Promise.all([
                newUser.save(),
                userProfile.save()
            ]).then(function( result) {
                console.log(result);
                return res
                        .type("application/json")
                        .status(200)
                        .send(JSON.stringify({"success": true, profile: result[1], "message": "registration successufull"}));

            }).catch(function(err) {
                if (err) throw err
            });
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