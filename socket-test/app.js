var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


//Whenever someone connects to the route, execute this action
//var clients = 0;
//var roomnum = 1;
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
    //clients++;

    //Increase roomnum 2 clients are present in a room.
    // if( io.nsps['/'].adapter.rooms["room-"+roomnum] && io.nsps['/'].adapter.rooms['room-'+roomnum].length > 1) roomnum++;
    // socket.join('room-'+roomnum);

    //send this event to everyone in the room
    // io.sockets.in('room-'+roomnum).emit('connectToRoom', 'You are in room number ' + roomnum);

    // //send a message after 4 seconds
    // setTimeout(function() {
    //     //sending an object when emitting and event
    //     socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
    // }, 4000);
    // socket.on('clientEvent', function(data) {
    //     console.log(data);
    // });
    // io.sockets.emit('broadcast', {description: clients + ' clients connected!'});
    // socket.emit('newclientconnect', {
    //     description: 'Hello, and welcome!'
    // });
    // socket.broadcast.emit('newclientconnect', {
    //     description: clients + ' clients connected!'
    // });

    //whenever someone disconnects, execute this action
    socket.on('disconnect', function () {
        console.log('A user disconnected');
        //clients--;
        // io.sockets.emit('broadcast', {description: ' clients connected!'});
        // socket.broadcast.emit('newclientconnect', {
        //     description: clients + ' clients connected!'
        // });
        //socket.leave('room-'+roomnum);
    });
});

// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket) {
//     console.log('Someone connected!');
//     nsp.emit('hi', 'Hello everyone!');
// });

http.listen(3005, function () {
    console.log('Listening on *:3005');
});