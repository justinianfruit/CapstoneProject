var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var mailer = require('nodemailer');

var keys = require('./config/keys');
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));

require('./config/routes')(app, mailer, keys.fromEmail, keys.fromPassword);
require('./config/socket')(io);

http.listen(port, function () {
    console.log('Listening on port ' + port);
});