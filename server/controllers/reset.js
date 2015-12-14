var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    async = require("async"),
    User = require("../models/user"),
    mongoose = require("mongoose"),
    jwt = require("jsonwebtoken"),
    async = require("async"),
    nodemailer = require("nodemailer"),

    transporter = nodemailer.createTransport("SMTP", {
      service: 'Gmail',
      auth: {
        user: "ssita.cms@gmail.com", 
        pass: "ssita_cms"
      }
    });

router.post("/", function (req, res, next) {
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) return next(err);
    if (user) {
      var token =jwt.sign({name: user.email, referer: req.get("Referer")}, req.app.get("superSecret"), {expiresIn: 180}),
          fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl,
          message = {
            from: "Softserve ITA <ssita.cms@gmail.com>",
            to: user.email,
            subject: "Відновлення паролю",
            text: "Привіт " + user.name + "! Для відновлення паролю перейдіть за посиланням: " + fullUrl + "?token=" + token
          };
      user
        .set("token", token)
        .save();
      transporter.sendMail(message, function (err, res) {
        if (err) return next(err);
        console.log("Повідомлення надіслано успішно. " + res.message);
      });
    } else {
      res.json({success: false, message: "Спробуйте зареєструватися!"});
    }
  });
});

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
              .set("password", Math.random())
              .set("token", "")
              .save();
            var message = {
              from: "Softserve ITA <ssita.cms@gmail.com>",
              to: user.email,
              subject: "Новий пароль", 
              text: "Привіт " + user.name + "! Ваш новий пароль: " + user.password
            };
            transporter.sendMail(message, function (err, res) {
              if (err) return next(err);
              console.log("Повідомлення надіслано успішно." + res.message);
            });
          } else {
            res.json({success:false, message: "Ви вже змінили пароль!"});
          }
          res.redirect(decoded.referer + "#login");
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