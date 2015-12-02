var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    async = require("async"),
    User = require("../models/user"),
    mongoose = require("mongoose"),
    nodemailer = require("nodemailer");

router.post("/", function (req, res, next) {

  async.waterfall([
    function (cb) {
      User.findOne({email: req.body.email}, cb);
    },
      function (user, cb) {

        user.password = 999 / Math.random();

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "ssita.cms@gmail.com",
            pass: "ssita_cms"
          }
        });

        var text = "Hello, " + user.name + "your new password is: " + user.password


        var mailOptions = {
          from: "ssita.cms@gmail.com",
          to: user.email,
          subject: "reset password",
          text: text
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            return next(err);
          }
          console.log("Message sent: " + info.response);
        });
      }
    ], cb(err));

});

module.exports = router;