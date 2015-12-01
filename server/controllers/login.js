var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    mongoose = require( "mongoose" ),
    bcrypt = require( "bcrypt-nodejs" ),
    jwt = require( "jsonwebtoken" ),
    User = require( "../models/userModel" );

router.post( "/", function ( req, res, next ) {

    UserModel.findOne( { email: req.body.email }, function ( err, user ) {

        if ( err ) throw err;

        if ( user ) {

            user.checkPassword( req.body.password, function ( err, isMatch ) {

                if ( err ) return next( err );

                if ( !isMatch ) {

                    res.status( 409 ).send({ 
                    success: false,
                    name: ".password",
                    message: "Authentication failed. Wrong password." 
                    });

                } else {

                    var token = jwt.sign( user, req.app.get( "superSecret" ), {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });

                    res.status( 200 ).send({
                        success: true,
                        message: "Enjoy your token!",
                        token: token,
                        role: user.role
                    });
                }

            });

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