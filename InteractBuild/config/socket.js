module.exports = function(io, User, Project) {
    function currentDate() {
        var date = new Date();
        var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return dateString;
    }
    function updateUserTitle(userID, projectID, title, updated) {
        User.findById(userID, function (err, user) {
            if (err) return console.error(err);
            var index = '';
            user.projects.forEach(function (project) {
                if (project.id == projectID) {
                    index = user.projects.indexOf(project);
                }
            });
            user.projects[index].title = title;
            user.projects[index].updated = updated;
            user.markModified('projects');
            user.save(function(err, user) {
                if (err) return console.error(err);
            });
            
        });
    }
    function updateUser(userID, projectID, updated) {
        User.findById(userID, function (err, user) {
            if (err) return console.error(err);
            var index = '';
            user.projects.forEach(function (project) {
                if (project.id == projectID) {
                    index = user.projects.indexOf(project);
                }
            });
            user.projects[index].updated = updated;
            user.markModified('projects');
            user.save(function(err, user) {
                if (err) return console.error(err);
            });
            
        });
    }
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
            var dateString = currentDate();
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.updated = dateString;
                proj.title.text = data.title;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " changed the title to " + data.title);
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            updateUserTitle(data.userID, data.projectId, data.title, dateString);
            io.sockets.emit('newTitle', data);
        });
        socket.on('backChange', function(data) {
            var dateString = currentDate();
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.updated = dateString;
                proj.title.background = data.color;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " changed the background color to " + data.color);
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            updateUser(data.userID, data.projectId, dateString);
            io.sockets.emit('newBack', data);
        });
        socket.on('textChange', function(data) {
            var dateString = currentDate();
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.updated = dateString;
                proj.title.foreground = data.color;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " changed the foreground color to " + data.color);
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            updateUser(data.userID, data.projectId, dateString);
            io.sockets.emit('newFore', data); 
        });
        socket.on('fontChange', function(data) {
            var dateString = currentDate();
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.updated = dateString;
                proj.title.font = data.font;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " changed the title font to " + data.font);
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            updateUser(data.userID, data.projectId, dateString);
            io.sockets.emit('newFont', data);
        });
        socket.on('addShape', function(data) {
            var dateString = currentDate();
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.updated = dateString;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " added a shape: " + data.shape);
                proj.images.push({
                    id: data.shapeID,
                    shape: data.shape,
                    height: data.height,
                    width: data.width,
                    left: data.left,
                    top: data.top
                });
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            updateUser(data.userID, data.projectId, dateString);
            io.sockets.emit('newShape', data);
        });
        //shape update
        socket.on('moveShape', function(data) {
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                
            })
        });
        socket.on('addText', function(data) {
            var dateString = currentDate();
            Project.findById(data.projectId, function(err, proj) {
                if (err) return console.error(err);
                proj.updated = dateString;
                proj.changeLog.push("<b>" + proj.updated + "</b>: " + data.name + " added some text");
                proj.text.push({
                    id: data.textID,
                    text: data.text,
                    left: data.left,
                    top: data.top
                });
                proj.save(function(err, proj) {
                    if (err) return console.error(err);
                });
            });
            updateUser(data.userID, data.projectId, dateString);
            io.sockets.emit('newText', data);
        });
        //update text
        socket.on('moveText', function(data) {

        });
    
        //whenever someone disconnects
        socket.on('disconnect', function () {
        });
    });
}