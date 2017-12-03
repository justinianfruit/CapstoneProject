var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var mailer = require('nodemailer');
var parser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var keys = require('./config/keys');
var port = process.env.PORT || 3000;

mongoose.connect(keys.mongoURI);
require('./config/passport');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(cookieParser());
app.use(parser());
app.use(session({ secret: 'ldsjfsldjfsldfj', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

var urlencodedParser = parser.urlencoded({ extended: false });

require('./config/routes')(app, urlencodedParser, mailer, keys.fromEmail, keys.fromPassword, passport);
require('./config/socket')(io);

http.listen(port, function () {
    console.log('Listening on port ' + port);
});