var socket = io();
var open = false;
var mailer = mailer;
var from = from;
var pass = password;
console.log(from + " " + pass);

//nav functionality

function clickBurger() {
    var nav = document.getElementById('navbar');

    if (document.body.contains(nav)) {
        //expanding nav when scaled down
        var hamburger = document.getElementById("hamburger");
        var open = false;
        hamburger.onclick = function () {
            if (open) {
                open = false;
            } else {
                open = true;
            }
            displayNav(open, menu);
        };
    }
}

function displayNav() {
    if (open) {
        open = false;
    } else {
        open = true;
    }
    var nav = document.getElementById("dropNav");
    var menu = [
        ["Profile", "/profile"],
        ["Wireframing", "/buildtool"],
        ["Chat", "/chat"],
        ["Logout", "#"]
    ];
    if (document.body.contains(nav)) {
        console.log('nav exists');
        if (open) {
            console.log('opening dropdown');
            var dropMenu = '<ul class="item dropMenu">';
            for (i = 0; i < menu.length; i++) {
                if (i == 0) {
                    dropMenu += '<li class="first"><a href="' + menu[i][1] + '">' + menu[i][0] + '</a></li>';
                } else {
                    dropMenu += '<li><a href="' + menu[i][1] + '">' + menu[i][0] + '</a></li>';
                }
            }
            dropMenu += '</ul>';
            nav.innerHTML = dropMenu;
            nav.style.display = "block";
        } else {
            nav.style.display = "none";
        }
    }
}

//chat functionality

function enter() {
    if (event.key === "Enter") {
        setUsername();
    }
}

function setUsername() {
    socket.emit('setUsername', document.getElementById('username').value);
}

var user;
socket.on('userExists', function (data) {
    document.getElementById('error-container').innerHTML = data;
});

socket.on('userSet', function (data) {
    user = data.username;
    var sudoBody = document.getElementById('sudo-body');
    sudoBody.innerHTML = '';
    sudoBody.innerHTML = '<div id="message-container"><ul id="chatlog"></ul></div><div id="messageEntry"><input type="text" id="message" onkeydown="enterMsg()" maxlength="300" autofocus><button id="sendMsg" type="button" name="button" onclick="sendMessage()">Send</button></div>';
});

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
            user: user
        });
    }
}

socket.on('newmsg', function (data) {
    if (user) {
        document.getElementById('chatlog').innerHTML += '<li><b>' + data.user + '</b>: ' + data.message + '</li>';
        var elem = document.getElementById('message-container');
        elem.scrollTop = elem.scrollHeight;
    }
});

//invite functionality

function showForm() {
    var btn = document.getElementById('collab');
    var form = document.getElementById('inviteForm');
    form.style.display = 'block';
    form.style.position = 'absolute';
    form.style.top = btn.offset().top + btn.outerHeight() + 10;
}

function invite() {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
        }
    });

    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
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