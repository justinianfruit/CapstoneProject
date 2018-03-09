var socket = io();
var open = false;
var userId = userId;
var username = username;
var project = project;

document.getElementById('chatWindow').style.display = 'none';
document.getElementById('historyWindow').style.display = 'none';

function currentDate() {
    var date = new Date();
    var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return dateString;
}

function setUpProject() {
    socket.emit('onLoad', {
        projectId: project
    });
}

setUpProject();

socket.on('loadProject', function (data) {
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
    //add shapes and text on load
    data.objects.forEach(function (shape) {
        var shapeDiv = document.createElement('div');
        shapeDiv.style.height = shape.height + 'px';
        shapeDiv.style.width = shape.width + 'px';
        shapeDiv.style.background = "url('/images/" + shape.shape + ".png') top no-repeat";
        shapeDiv.style.backgroundSize = "100% 100%";
        shapeDiv.style.zIndex = 5;
        shapeDiv.style.display = 'inline-block';
        shapeDiv.className = "resize-drag";
        shapeDiv.setAttribute('id', shape.id);
        document.getElementById('project').appendChild(shapeDiv);
    });
    data.text.forEach(function (msg) {
        var text = document.createElement('div');
        var textDiv = document.createElement('input');
        textDiv.setAttribute('type', 'text');
        textDiv.defaultValue = msg.text;
        textDiv.style.border = 'none';
        textDiv.size = 4;
        textDiv.style.fontSize = '30px';
        textDiv.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        textDiv.style.margin = '15px';
        text.appendChild(textDiv);
        text.style.zIndex = 5;
        text.style.display = 'inline-block';
        text.className = 'draggable';
        shapeDiv.setAttribute('id', msg.id);
        document.getElementById('project').appendChild(text);
    })
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
    document.getElementById('histlog').innerHTML += "<li><b>" + currentDate() + "</b>: " + data.name + " changed title to: " + data.title + '</li>';
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
    document.getElementById('histlog').innerHTML += '<li><b>' + currentDate() + '</b>: ' + data.name + 'changed background color to #' + data.color + '</li>';
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
    document.getElementById('histlog').innerHTML += '<li><b>' + currentDate() + '</b>:' + data.name + ' changed foreground color to #' + data.color + '</li>';
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
    document.getElementById('histlog').innerHTML += '<li><b>' + currentDate() + '</b>:' + data.name + ' changed font to ' + data.font + '</li>';
    var elem = document.getElementById('historyCont');
    elem.scrollTop = elem.scrollHeight;
});

function addText() {
    var date = new Date();
    var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    socket.emit('addText', {
        userID: userId,
        projectId: project,
        textID: project + '-text-' + dateString,
        text: "Text",
        left: 100,
        top: 100
    });
}

socket.on('newText', function (data) {
    var text = document.createElement('div');
    var textDiv = document.createElement('input');
    textDiv.setAttribute('type', 'text');
    textDiv.defaultValue = data.text;
    textDiv.style.border = 'none';
    textDiv.size = 4;
    textDiv.style.fontSize = '30px';
    textDiv.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    textDiv.style.margin = '15px';
    text.appendChild(textDiv);
    text.style.zIndex = 5;
    text.style.display = 'inline-block';
    text.className = 'draggable';
    text.setAttribute('id', data.textID);
    document.getElementById('project').appendChild(text);
    document.getElementById('histlog').innerHTML += '<li><b>' + currentDate() + '</b>:' + data.name + ' added some text</li>';
});

function addShape(shape) {
    var date = new Date();
    var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    socket.emit('addShape', {
        userID: userId,
        projectId: project,
        shapeID: project + '-' + shape + '-' + dateString,
        shape: shape,
        height: 300,
        width: 300,
        left: 100,
        top: 100
    });
}

socket.on('newShape', function (data) {
    var shapeDiv = document.createElement('div');
    shapeDiv.style.height = data.height + 'px';
    shapeDiv.style.width = data.width + 'px';
    shapeDiv.style.background = "url('/images/" + data.shape + ".png') top no-repeat";
    shapeDiv.style.backgroundSize = "100% 100%";
    shapeDiv.style.zIndex = 5;
    shapeDiv.style.display = 'inline-block';
    shapeDiv.className = "resize-drag";
    shapeDiv.setAttribute('id', data.shapeID);
    document.getElementById('project').appendChild(shapeDiv);
    document.getElementById('histlog').innerHTML += '<li><b>' + currentDate() + '</b>:' + data.name + ' added a shape: ' + data.shape + '</li>';
});

function dragMoveListener(event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

interact('.draggable')
    .draggable({
        inertia: false,
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: {
                top: 0,
                left: 0,
                bottom: 1,
                right: 1
            }
        },
        autoScroll: false,
        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            console.log(event.target.id);
            //'moved a distance of ' + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0)).toFixed(2) + 'px');
        }
    });
interact('.resize-drag')
    .draggable({
        restrict: {
            restriction: 'parent',
            elementRect: {
                top: 0,
                left: 0,
                bottom: 1,
                right: 1
            }
        },
        onmove: dragMoveListener,
        onend: function (event) {
            console.log(event.target.id);
            //'moved a distance of ' + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0)).toFixed(2) + 'px');
        }
    })
    .resizable({
        // resize from all edges and corners
        edges: {
            left: true,
            right: true,
            bottom: true,
            top: true
        },
        // keep the edges inside the parent
        restrictEdges: {
            outer: 'parent',
            endOnly: true,
        },
        // minimum size
        restrictSize: {
            min: {
                width: 10,
                height: 10
            },
        },
        inertia: false
    })
    .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);
        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;
        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        //call socket here, gonna be a ton of calls
        console.log(target.id);
    });

//execute socket emits here for updating shape and text size/contents/location