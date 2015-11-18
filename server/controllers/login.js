var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    mongoose = require( "mongoose" ),
    bcrypt = require( "bcrypt-nodejs" ),
    jwt = require( "jsonwebtoken" ),
    User = require( "../models/userModel" );

router.post( "/", function ( req, res, next ) {

    var email = req.body.email,
        password = req.body.password;

    User.findOne( { email: email }, function ( err, user ) {

        if ( err ) throw err;

        if ( user ) {

            if ( !user.checkPassword( password ) ) {

                res.status( 409 ).send({ 
                    success: false,
                    name: ".password",
                    message: "Authentication failed. Wrong password." 
                });

            } else {

                var token = jwt.sign(user, req.app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                res.status( 200 ).send({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        } else {

            res.status( 404 ).send({ 
                success: false,
                name: ".email",
                message: "User with this email not found." 
            });

        }
    });
});

module.exports = router;