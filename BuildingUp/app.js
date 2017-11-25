var express = require('express');
var app = express();
var ColorPicker = require('a-color-picker');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', function (req, res) {
    res.render('profile');
});

app.get('/profile', function (req, res) {
    res.render('profile');
});

app.get('/buildtool', function (req, res) {
    res.render('buildtool');
});

app.get('/chat', function (req, res) {
    res.render('chat');
});

var backColorPicker;
if (document.getElementById("backgroundPicker") != null) {
    backColorPicker.createPicker(document.getElementById('backgroundPicker'));
}

var users = [];
io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('setUsername', function(data) {
        if(users.indexOf(data) == -1) {
            users.push(data);
            socket.emit('userSet', {username: data});
        } else {
            socket.emit('userExists', data + ' username is taken!');
        }
    });
    socket.on('msg', function(data) {
        //send msg to everyone
        io.sockets.emit('newmsg', data);
    });

    //whenever someone disconnects
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(3000, function () {
    console.log('Listening on port 3000');
});