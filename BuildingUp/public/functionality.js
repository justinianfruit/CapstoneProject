var socket = io();

function clickBurger() {
    var menu = [
        ['Profile', '/profile'],
        ['Build Tool', '/buildtool'],
        ['Chat', '/chat'],
        ['Logout', '/logout']
    ];
    var nav = document.getElementById('navbar');
    if (document.body.contains(nav)) {
        //expanding nav when scaled down
        var hamburger = document.getElementById("hamburger");
        var open = false;
        hamburger.onclick = function() {
            if (open) {
                open = false;
            } else {
                open = true;
            }
            displayNav(open, menu);
        };
    }
}

clickBurger();

function displayNav(menuOpen, menuList) {
    var nav = document.getElementById("dropNav");
    if (document.body.contains(nav)) {
        if (menuOpen) {
            var dropMenu = '<ul class="item dropMenu">';
            for (i = 0; i < menuList.length; i++) {
                if (i == 0) {
                    dropMenu += '<li class="first"><a href="' + menuList[i][1] + '">' + menuList[i][0] + '</a></li>';
                } else {
                    dropMenu += '<li><a href="' + menuList[i][1] + '">' + menuList[i][0] + '</a></li>';
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

function setUsername() {
    socket.emit('setUsername', document.getElementById('name').value);
}

var user;
socket.on('userExists', function(data) {
    document.getElementById('error-container').innerHTML = data;
});

socket.on('userSet', function(data) {
    user = data.username;
    var sudoBody = document.getElementById('sudo-body');
    sudoBody.innerHTML = '<input type="text" id="message"><button type="button" name="button" onclick="sendMessage()">Send</button><div id="message-container"></div>';
});

function sendMessage() {
    var msg = document.getElementById('message').value;
    if(msg) {
        socket.emit('msg', {message: msg, user: user});
    }
}

socket.on('newmsg', function(data) {
    if(user) {
        document.getElementById('message-container').innerHTML += '<div><b>' + data.user + '</b>: ' + data.message + '</div>';
    }
});

function changeTitle() {
    console.log('changeTitle()');
    var newTitle = document.getElementById("titleBox").value;
    socket.emit('titleChange', {title: newTitle});
    //document.getElementById("cardTitle").innerHTML = newTitle;
}

socket.on('newTitle', function(data) {
    document.getElementById("cardTitle").innerHTML = data;
});

function updateBack(jscolor) {
    console.log('updateBack(jscolor)');
    //socket.emit('backChange', {color: jscolor});
    document.getElementById('card').style.backgroundColor = '#' + jscolor;
}

socket.on('newBack', function(data){
    document.getElementById('card').style.backgroundColor = '#' + data;
});

function updateText(jscolor) {
    console.log('updateText(jscolor)');
    //socket.emit('textChange', {color: jscolor});
    document.getElementById('card').style.color = '#' + jscolor;
}

socket.on('newFore', function(data) {
    document.getElementById('card').style.color = '#' + data;
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
    //socket.emit('fontChange', {font: listValue, family: general});
    document.getElementById('cardTitle').style.fontFamily = listValue;
}

socket.on('newFont', function(data) {
    document.getElementById('cardTitle').style.fontFamily = data.font;
});