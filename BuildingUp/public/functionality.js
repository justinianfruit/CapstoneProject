var socket = io();
var open = false;
var userId = userId;
var username = username;
var project = project;
var con = this;

document.getElementById('chatWindow').style.display = 'none';
document.getElementById('historyWindow').style.display = 'none';

var canvas = new fabric.Canvas('project');
canvas.selection= false;
con.container= document.getElementById("card");

function setUpProject() {
    socket.emit('onLoad', {
       projectId: project 
    });
}

setUpProject();

socket.on('loadProject', function(data) {
    for (i = 0; i < data.history.length; i++) {
        document.getElementById('histlog').innerHTML += '<li>' + data.history[i] + '</li>';
    }
    for (i = 0; i < data.chat.length; i++) {
        document.getElementById('chatlog').innerHTML += '<li><b>' + data.chat[i].name + '</b>: ' + data.chat[i].message + '</li>';
    }
    document.getElementById('titleBox').value = data.title;
    document.getElementById('cardTitle').innerHTML = data.title;
    document.getElementById('backColor').value = data.background;
    document.getElementById('backColor').style.backgroundColor = "#" + data.background;
    document.getElementById('project').style.backgroundColor = "#" + data.background;
    document.getElementById('textColor').value = data.foreground;
    document.getElementById('textColor').style.backgroundColor = "#" + data.foreground;
    document.getElementById('card').style.color = "#" + data.foreground;
    document.getElementById('cardTitle').style.fontFamily = data.font;
    document.getElementById('fontBox').value = data.font;
    data.objects.forEach(function (shape) {
        fabric.Image.fromURL("images/" + shape.shape + '.png', function(oImg) {
            oImg.set('left', shape.left).set('top', shape.top);
            canvas.add(oImg);
        });
    });
    for (i = 0; i < data.text.length; i++) {
        canvas.add(new fabric.IText(data.text[i].text, { left: data.text[i].left, top: data.text[i].top }));
    }
    canvas.on('object:moving', this.emitObjectModifying);
    canvas.on('object:scaling', this.emitObjectModifying);
    canvas.on('object:rotating', this.emitObjectModifying);
    canvas.on('mouse:up', this.emitObjectStoppedModifying);
    canvas.on('mouse:up', this.dragMouseUp);
});

//chat functionality

function showChat() {
    var chat = document.getElementById('chatWindow');
    var btn = document.getElementById('chatBtn');
    if (chat.style.display == "none") {
        chat.style.display = "block";
        chat.style.top = btn.style.top + btn.style.outerHeight + 10;
        var elem = document.getElementById('message-container');
        elem.scrollTop = elem.scrollHeight;
    } else {
        chat.style.display = "none";
    }
}

function enterMsg(box) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    var msg = document.getElementById('message').value;
    document.getElementById('message').value = '';
    if (msg) {
        socket.emit('msg', {
            message: msg,
            userID: userId,
            name: username,
            projectId: project
        });
    }
}

socket.on('newmsg', function (data) {
    document.getElementById('chatlog').innerHTML += '<li><b>' + data.name + '</b>: ' + data.message + '</li>';
    var elem = document.getElementById('message-container');
    elem.scrollTop = elem.scrollHeight;
});

function showHistory() {
    var hist = document.getElementById('historyWindow');
    var btn = document.getElementById('histBtn');
    if (hist.style.display == "none") {
        hist.style.display = "block";
        hist.style.top = btn.style.top + btn.style.outerHeight + 10;
        var elem = document.getElementById('historyCont');
        elem.scrollTop = elem.scrollHeight;
    } else {
        hist.style.display = "none";
    }
}

//invite functionality

function showForm() {
    var btn = document.getElementById('collab');
    var form = document.getElementById('inviteForm');
    if (form.style.display == 'block') {
        form.style.display = 'none';
    } else {
        form.style.display = 'block';
        form.style.position = 'absolute';
        form.style.top = btn.style.top + btn.style.outerHeight + 10;
    }
}

function checkEmail() {
    var goodEmail = false;
    var to = document.getElementById('emailEntry').value;
    var btn = document.getElementById('sendEmail');
    btn.disabled = true;
    if (to.includes('@gmail.com')) {
        goodEmail = true;
        btn.disabled = false;
    }
    return goodEmail;
}

function invite() {
    document.getElementById('inviteForm').style.display = 'none';
}

//tool functionality

function changeTitle() {
    var newTitle = document.getElementById("titleBox").value;
    socket.emit('titleChange', {
        title: newTitle,
        userID: userId,
        name: username,
        projectId: project
    });
}

socket.on('newTitle', function (data) {
    document.getElementById("titleBox").value = data.title;
    document.getElementById("cardTitle").innerHTML = data.title;
    document.getElementById('histlog').innerHTML += '<li><b>' + data.name + '</b>: changed title to ' + data.title + '</li>';
    var elem = document.getElementById('historyCont');
    elem.scrollTop = elem.scrollHeight;
});

function updateBack(jscolor) {
    socket.emit('backChange', {
        color: jscolor,
        userID: userId,
        name: username,
        projectId: project
    });
}

socket.on('newBack', function (data) {
    document.getElementById('project').style.backgroundColor = '#' + data.color;
    document.getElementById('histlog').innerHTML += '<li><b>' + data.name + '</b>: changed background color to #' + data.color + '</li>';
    var elem = document.getElementById('historyCont');
    elem.scrollTop = elem.scrollHeight;
});

function updateText(jscolor) {
    socket.emit('textChange', {
        color: jscolor,
        userID: userId,
        name: username,
        projectId: project
    });
}

socket.on('newFore', function (data) {
    document.getElementById('cardTitle').style.color = '#' + data.color;
    document.getElementById('histlog').innerHTML += '<li><b>' + data.name + '</b>: changed foreground color to #' + data.color + '</li>';
    var elem = document.getElementById('historyCont');
    elem.scrollTop = elem.scrollHeight;
});

function setFont() {
    var listValue = document.getElementById('fontBox').value;
    var general = "";
    if (listValue == "Alegreya Sans SC") {
        general = "sans-serif";
    } else {
        general = "cursive";
    }
    socket.emit('fontChange', {
        font: listValue,
        family: general,
        userID: userId,
        name: username,
        projectId: project
    });
}

socket.on('newFont', function (data) {
    document.getElementById('cardTitle').style.fontFamily = data.font;
    document.getElementById('histlog').innerHTML += '<li><b>' + data.name + '</b>: changed font to ' + data.font + '</li>';
    var elem = document.getElementById('historyCont');
    elem.scrollTop = elem.scrollHeight;
});

function addText() {
    socket.emit('addText', {
        projectId: project,
        text: "Text",
        left: 100,
        top: 100
    });
}

socket.on('newText', function(data) {
    var text = new fabric.IText(data.text, { left: data.left, top: data.top });
    document.getElementById('histlog').innerHTML += '<li><b>' + data.name + '</b>: added some text</li>';
    canvas.add(text);
});

function addShape(shape) {
    socket.emit('addShape', {
        projectId: project,
        shape: shape,
        left: 100,
        top: 100
    });
}

socket.on('newShape', function(data) {
    fabric.Image.fromURL("images/" + data.shape + '.png', function(oImg) {
        oImg.set('left', data.left).set('top', data.top);
        document.getElementById('histlog').innerHTML += '<li><b>' + data.name + '</b>: added a shape - ' + data.shape + '</li>';
        canvas.add(oImg);
    });
    canvas.renderAll();
});
