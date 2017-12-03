var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev')); //logs every request to the console
app.use(cookieParser()); //reads cookies, needed for auth
app.use(bodyParser()); //gets info from html forms

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(session({ secret: 'ilovecatsidfk', saveUninitialized: true, resave: true})); //session secret, not really sure what that means though
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, urlencodedParser, passport);

app.listen(port);
console.log('Listening on port ' + port);