module.exports = function(io, User, Project) {
    io.on('connection', function (socket) {
        socket.on('msg', function(data) {
            //send msg to everyone
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.chatlog.push({name: data.name, msg: data.message});
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            io.sockets.emit('newmsg', data);
        });
        socket.on('titleChange', function(data) {
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.updated = Date();
                proj.title.text = data.title;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " changed the title to " + data.title);
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            io.sockets.emit('newTitle', data);
        });
        socket.on('backChange', function(data) {
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.updated = Date();
                proj.title.background = data.color;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " changed the background color to " + data.color);
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            io.sockets.emit('newBack', data);
        });
        socket.on('textChange', function(data) {
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.updated = Date();
                proj.title.foreground = data.color;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " changed the foreground color to " + data.color);
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            io.sockets.emit('newFore', data); 
        });
        socket.on('fontChange', function(data) {
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.updated = Date();
                proj.title.font = data.font;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " changed the title font to " + data.font);
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            io.sockets.emit('newFont', data);
        });
    
        //whenever someone disconnects
        socket.on('disconnect', function () {
            console.log('A user disconnected');
        });
    });
}