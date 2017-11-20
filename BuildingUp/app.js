var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile('pages/profile');
});

app.get('/buildtool', function (req, res) {
    res.sendFile('pages/buildtool');
});

app.get('/chat', function (req, res) {
    res.sendFile('pages/chat');
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

    //whenever someone disconnects
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(3000, function () {
    console.log('Listening on *:3000');
});