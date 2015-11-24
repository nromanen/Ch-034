var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    mongoose = require( "mongoose" ),
    bcrypt = require( "bcrypt-nodejs" ),
    User = require( "../models/userModel" );

router.post( "/", function ( req, res, next ) {

    User.findOne( { email: req.body.email }, function ( err, user ) {

        if ( err ) throw err;

        if ( user ) {

            res.status( 409 ).send({
                success: false,
                message: "User with this email is already registered"
            });

        } else {

            var user = new User({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password
            });

            user.save( function ( err ) {

                if ( err ) throw err;

                res.status( 200 ).send({
                    success: true,
                    message: "User created successfully!"
                });

            });
        }
    });
});

module.exports = router;