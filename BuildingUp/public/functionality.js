var socket = io();
var open = false;
var user = username;
console.log(user);
document.getElementById('chatWindow').style.display = 'none';

function updatePicture() {
    var canvas = document.getElementById('project');
    var pic = canvas.toDataURL();
    return pic;
}

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
            name: user
        });
    }
}

socket.on('newmsg', function (data) {
    document.getElementById('chatlog').innerHTML += '<li><b>' + data.name + '</b>: ' + data.message + '</li>';
    var elem = document.getElementById('message-container');
    elem.scrollTop = elem.scrollHeight;
});

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
    console.log('changeTitle()');
    var newTitle = document.getElementById("titleBox").value;
    socket.emit('titleChange', {
        title: newTitle
    });
}

socket.on('newTitle', function (data) {
    document.getElementById("titleBox").value = data.title;
    document.getElementById("cardTitle").innerHTML = data.title;
});

function updateBack(jscolor) {
    console.log('updateBack(jscolor)');
    socket.emit('backChange', {
        color: jscolor
    });
}

socket.on('newBack', function (data) {
    document.getElementById('card').style.backgroundColor = '#' + data.color;
});

function updateText(jscolor) {
    console.log('updateText(jscolor)');
    socket.emit('textChange', {
        color: jscolor
    });
}

socket.on('newFore', function (data) {
    document.getElementById('card').style.color = '#' + data.color;
});

function setFont() {
    console.log('setFont()');
    //this doesn't set the font family of entire div, figure out how to do that
    var listValue = document.getElementById('fontBox').value;
    var general = "";
    if (listValue == "Alegreya Sans SC") {
        general = "sans-serif";
    } else {
        general = "cursive";
    }
    socket.emit('fontChange', {
        font: listValue,
        family: general
    });
}

socket.on('newFont', function (data) {
    document.getElementById('cardTitle').style.fontFamily = data.font;
});