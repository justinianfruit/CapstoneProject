module.exports = function(io) {
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
}