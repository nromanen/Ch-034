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
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "ssita.cms@gmail.com",
            pass: "ssita_cms"
          }
        }, {
          from: "ssita.cms@gmail.com",
          headers: {
            "My-Awesome-Header": "123"
          }
        });

        transporter.sendMail({
          to: user.email,
          subject: "Reset password",
          text: "Hello user.name! Your new password:aA1234567"
        });
      }
    ], cb(err));

});

module.exports = router;