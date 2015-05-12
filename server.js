'use strict';

// variables
var express     = require('express');
var session     = require('express-session');
var mysql       = require('mysql');
var swig        = require('swig');
var app         = express();
var bodyParser  = require('body-parser');

// controllers
var home        = require('./app/controllers/home')(app);

//app.use( bodyParser.json() );     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.engine('html', swig.renderFile);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'html');

app.use(session({
    secret: 'demo',
    cookie: {
        maxAge: 3600000000
    },
    resave: false,
    saveUninitialized: true
}));

// routes
app.get('/', home.index);
app.post('/', home.index);

// static
app.use(express.static(__dirname + '/app/public'));

app.listen(8080, function (){
    console.log("Server started");
});