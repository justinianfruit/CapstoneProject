var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

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
    socket.on('titleChange', function(data) {
        console.log('Title was changed.');
        io.sockets.emit('newTitle', data);
    });
    socket.on('backChange', function(data) {
        console.log('Background color was changed.');
        io.sockets.emit('newBack', data);
    });
    socket.on('textChange', function(data) {
        console.log('Text color was changed.');
        io.sockets.emit('newFore', data); 
    });
    socket.on('fontChange', function(data) {
        console.log('Font was changed.');
        io.sockets.emit('newFont', data);
    });

    //whenever someone disconnects
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(port, function () {
    console.log('Listening on port ' + port);
});