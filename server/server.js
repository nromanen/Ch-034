// =======================
// get the packages we need ============
// =======================
var express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
    config = require('./config'); // get our config file

// =======================
// configuration =========
// =======================
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
});

//app.use( require( "./middlewares/auth" ) );
app.use( "/api", require( "./controllers" ) );
app.listen( config.port );
console.log( "Magic happens at http://localhost:" + config.port );