var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    mongoose = require( "mongoose" ),
    User = require( "../models/user" );

router.get( "/", function ( req, res ) {
  User.find({}, function ( err, users ){
    if( err ) return next(err);
    res.json( users );
  });
});

module.exports = router;