// =======================
// get the packages we need ============
// =======================
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    docs = require("express-mongoose-docs"),
    cors = require("cors"),
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
app.use(cors());
//app.use(require('./middlewares/cors'));
app.use('/authenticate', require('./controllers/authenticate'));
app.use('/api', require('./middlewares/auth'));
app.use('/api', require('./controllers'));


app.listen(port);
docs(app, mongoose);