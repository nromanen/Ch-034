var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    jwt = require("jsonwebtoken"),
    User = require("../models/user"),
    Profile = require("../models/profile");

router.post('/', function(req, res) {
    User
        .findOne({email: req.body.email})
        .populate("_profile")
        .exec(function(err, user) {
            if (err) throw err;
            if (!user) {
                res.status(401);
                return res.json({ success: false, message: "Помилка аутентифікації. Користувач не знайдений." });
            } else if (user) {
                user.comparePassword(req.body.password, function(err, match) {
                    if (err || !match) {
                        res.status(401);
                        return res.json({ success: false, message: "Помилка аутентифікації. Неправильний пароль." });
                    } 
                    if (user.isConfirmed === false) {
                        res.json({success: false, message: "Активуйте ваш обліковий запис!"});
                    } else {
                        var token = jwt.sign({name: user.email}, req.app.get("superSecret"), { expiresIn: 60000 });
                        res.status(200);
                        return res.json({
                                authenticated: true,
                                profile: user._profile,
                                message: "Token successfully sent",
                                token: token
                            });
                    }
                });
            }
        });
});

router.post("/check_auth", function(req, res) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.status(403).json({ success: false, message: "Failed to authenticate token." });
            } else {
                req.decoded = decoded;
                return res.json({success: true, message: "Authenticated"});
            }
        });
    } else {
      return res.status(403).send({
          success: false,
          message: "No token provided."
      });
    }
});

module.exports = router;