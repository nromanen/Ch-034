var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    async = require("async"),
    User = require("../models/user"),
    mongoose = require("mongoose"),
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
    if (err) {
      return next(err);
    }
    if (user) {
      user.set("password", Math.random());
      user.save();
      var message = {
            from: "Softserve ITA <ssita.cms@gmail.com>",
            to: user.email,
            subject: "Відновлення паролю", 
            text: "Привіт " + user.name + "! Ваш новий пароль: " + user.password
          };
      transporter.sendMail(message, function (err, res) {
        if (err) {
          return next(err);
        }
        console.log("Повідомлення про зміну пароля успішно відправлено!", res.message);
      });
    } else {
      return next();
   }
  });
});

module.exports = router;