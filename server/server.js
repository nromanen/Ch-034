// =======================
// get the packages we need ============
// =======================
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    docs = require("express-mongoose-docs");
    jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
    config = require('./config'); // get our config file
    
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8888; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    next();
});

app.use('/api', require('./controllers'));
//app.use(require('./middlewares/auth'));

app.listen(port);
docs(app, mongoose);