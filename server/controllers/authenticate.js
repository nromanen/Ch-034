var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = require('../models/user'),
    Profile = require('../models/profile');

router.post('/', function(req, res) {

    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401);
            return res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            user.comparePassword(req.body.password, function(err, match) {
                if (err || !match) {
                    res.status(401);
                    return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    var token = jwt.sign({name: user.email}, req.app.get('superSecret'), { expiresIn: 86400 });
                    Profile.findOne({"_user": user._id}).exec(function(err, profile) {
                        if (err) throw err;
                        res.status(200);
                        return res.json({
                            authenticate: true,
                            profile: profile,
                            message: 'Token successfully sent',
                            token: token
                        });
                    });
                }
            });
        }
    });
});

module.exports = router;