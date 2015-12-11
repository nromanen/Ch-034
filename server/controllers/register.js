var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("../models/user"),
    Profile = require("../models/profile"),
    jwt = require("jsonwebtoken"),
    nodemailer = require("nodemailer"),

    transporter = nodemailer.createTransport("SMTP", {
      service: 'Gmail',
      auth: {
        user: "ssita.cms@gmail.com", 
        pass: "ssita_cms"
      }
    });

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
                .status(409)
                .json({"success": false, "message": "Користувач з даною e-mail адресою вже існує"});
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
            var token = jwt.sign({name: req.body.email, referer: req.get("Referer")}, req.app.get("superSecret"), {expiresIn: 180}),
                fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
                newUser.set("token", token);
                transporter.sendMail({
                    from: "Softserve ITA <ssita.cms@gmail.com>",
                    to: req.body.email,
                    subject: "Активація облікового запису",
                    text: "Привіт " + req.body.name + "! Для завершення реєстрації перейдіть за посиланням: " + fullUrl + "?token=" + token
                }, function (err, res) {
                    if (err) return next(err);
                    console.log("Повідомлення успішно відправлено"+ res.message);
                });
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
                    .status(409)
                    .json({"success": false, "message": "This email is already registered"});
            } else {
                return res
                    .status(200)
                    .json({"success": true,"message": "This email is free to use"});
            }
        })
})
router.get("/", function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, req.app.get("superSecret"), function (err, decoded) {
      if (err) return next(err);
      User.findOne({email: decoded.name}, function (err, user) {
        if (err) return next(err);
        if (user) {
            if (user.token === token) {
              user
                .set("isConfirmed", true)
                .set("token", "")
                .save();
              res.redirect(decoded.referer + "#login");
            } else {
                res.json({success: false, message: "Даний обліковий запис вже активовано!"});
            }
        } else {
          return next();
        }
      });
    });
  } else {
    return next();
  }
});

module.exports = router;