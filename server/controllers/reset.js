var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    async = require("async"),
    User = require("../models/user"),
    mongoose = require("mongoose"),
    nodemailer = require("nodemailer"),
    smtpPool = require("nodemailer-smtp-pool"),

    transporter = nodemailer.createTransport("SMTP", {
      service: 'Gmail',
      auth: {
        XOAuth2: {
          user: "ssita.cms@gmail.com", 
          clientId: "985561173030-4qfrtnejqapgdpe4l16k6mqvis2qa3hg.apps.googleusercontent.com",
          clientSecret: "C8j3U8g13q44ImPSMWBlHoh5",
          refreshToken: "1/e8dqLT8p0SZrGFrYlU6M1Em_1LyhZiQGbQ1elHB3UT5IgOrJDtdun6zK6XiATCKT"
        }
      }
    });

router.post("/", function (req, res, next) {
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      var message = {
            from: "Softserve ITA <ssita.cms@gmail.com>",
            to: req.body.email,
            subject: "Reset password", 
            text: "Hello, this is your new password"
          };

      transporter.sendMail(message, function (error, response) {
        if (error) {
          return next(error);
        }
        console.log("Message sent successfully!", response.message);
      });
    } else {
      return next();
   }
  });
});

module.exports = router;