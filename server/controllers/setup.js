var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require( "../models/userModel" );

router.get( "/", function ( req, res ) {
    var user = new User({
        name: "admin",
        surname: "admin",
        email: "admin@email.com",
        password: "pass"
    });

    user.save();
});

module.exports = router;