var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    async = require("async"),
    User = require("../models/user"),
    mongoose = require("mongoose"),
    nodemailer = require("nodemailer"),
    smtpPool = require("nodemailer-smtp-pool");

router.post("/", function (req, res, next) {

  User.findOne({email: req.body.email}, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      var userEmail = user.email,
          transporter = nodemailer.createTransport(smtpPool({
            service: 'Gmail',
            auth: {
                user: 'ssita.cms@gmail.com',
                pass: 'ssita_cms'
            }
          })),

          message = {
            from: "Softserve ITA <ssita.cms@gmail.com>",
            to: userEmail,
            subject: "Reset password", 
            text: "Hello, this is your new password"
          };

      transporter.sendMail(message, function (err, info) {
        if (err) {
          return next(err);
        }
        console.log("Message sent successfully!", info.res);
      });
    } else {
      return next();
   }
  });
});

module.exports = router;