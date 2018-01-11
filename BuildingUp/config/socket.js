module.exports = function(io, User, Project) {
    io.on('connection', function (socket) {
        socket.on('onLoad', function(data) {
            var title = '', background = '', foreground='', font='', chat=[], history=[], objects=[], text=[];
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                title = proj.title.text;
                background = proj.title.background;
                foreground = proj.title.foreground;
                font = proj.title.font;
                chat = proj.chatLog;
                history = proj.changeLog;
                objects = proj.images;
                text = proj.text;
                io.sockets.emit('loadProject', {
                    title: title,
                    background: background,
                    foreground: foreground,
                    font: font,
                    chat: chat,
                    history: history,
                    objects: objects,
                    text: text
                });
            });
        });
        socket.on('msg', function(data) {
            //send msg to everyone
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.chatLog.push({name: data.name, msg: data.message});
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            io.sockets.emit('newmsg', data);
        });
        socket.on('titleChange', function(data) {
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                var date = new Date();
                var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                proj.updated = dateString;
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
                var date = new Date();
                var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                proj.updated = dateString;
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
                var date = new Date();
                var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                proj.updated = dateString;
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
                var date = new Date();
                var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                proj.updated = dateString;
                proj.title.font = data.font;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " changed the title font to " + data.font);
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            io.sockets.emit('newFont', data);
        });
        socket.on('addShape', function(data) {
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                var date = new Date();
                var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                proj.updated = dateString;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " added a shape: " + data.shape);
                proj.images.push({
                    shape: data.shape,
                    left: data.left,
                    top: data.top
                });
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            io.sockets.emit('newShape', data);
        });
        socket.on('addText', function(data) {
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                var date = new Date();
                var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                proj.updated = dateString;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " added some text: " + data.text);
                proj.text.push({
                    text: data.text,
                    left: data.left,
                    top: data.top
                });
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            io.sockets.emit('newText', data);
        });
    
        //whenever someone disconnects
        socket.on('disconnect', function () {
        });
    });
}