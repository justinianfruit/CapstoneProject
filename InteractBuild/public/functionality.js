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

function getPosition(el) {
    el = el.getBoundingClientRect();
    return {
        left: Math.round(el.left),
        top: Math.round(el.top)
    }
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
        shapeDiv.style.position = 'absolute';
        shapeDiv.style.height = shape.height;
        shapeDiv.style.width = shape.width;
        shapeDiv.style.left = shape.left + 'px';
        shapeDiv.style.top = shape.top + 'px';
        shapeDiv.style.margin = 0;
        shapeDiv.style.marginTop = 435+'px';
        shapeDiv.style.background = "url('/images/" + shape.shape + ".png') top no-repeat";
        shapeDiv.style.backgroundSize = "100% 100%";
        shapeDiv.style.zIndex = 5;
        shapeDiv.className = "resize-drag";
        shapeDiv.setAttribute('id', shape.id);
        document.getElementById('project').appendChild(shapeDiv);
    });
    data.text.forEach(function (msg) {
        var text = document.createElement('div');
        text.style.left = msg.left +'px';
        text.style.top = msg.top + 'px';
        text.style.margin = 0;
        text.style.marginTop = 435+'px';
        text.style.position = 'absolute';
        var textDiv = document.createElement('input');
        textDiv.setAttribute('type', 'text');
        textDiv.defaultValue = msg.text;
        textDiv.style.border = 'none';
        textDiv.size = 4;
        textDiv.style.fontSize = '30px';
        textDiv.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        textDiv.style.margin = '15px';
        textDiv.onblur = function() {alterText(this)};
        text.appendChild(textDiv);
        text.style.zIndex = 5;
        text.className = 'draggable';
        text.setAttribute('id', msg.id);
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

function updateTitle() {
    var newTitle = document.getElementById('titleBox').value;
    socket.emit('titleUpdate', {
        title: newTitle,
        userID: userId,
        name: username,
        projectId: project
    });
}

socket.on('pushUpdate', function (data) {
    document.getElementById('histlog').innerHTML += "<li><b>" + currentDate() + "</b>: " + data.name + " changed title to: " + data.title + '</li>';
    var elem = document.getElementById('historyCont');
    elem.scrollTop = elem.scrollHeight;
});

socket.on('newTitle', function (data) {
    document.getElementById("titleBox").value = data.title;
    document.getElementById("cardTitle").innerHTML = data.title;
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
        left: 0,
        top: 0
    });
}

socket.on('newText', function (data) {
    var text = document.createElement('div');
    text.style.position = 'absolute';
    var textDiv = document.createElement('input');
    textDiv.setAttribute('type', 'text');
    textDiv.defaultValue = data.text;
    textDiv.style.border = 'none';
    textDiv.size = 4;
    textDiv.style.fontSize = '30px';
    textDiv.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    textDiv.style.margin = '15px';
    textDiv.onblur = function() {alterText(this)};
    text.appendChild(textDiv);
    text.style.zIndex = 5;
    text.className = 'draggable';
    text.setAttribute('id', data.textID);
    document.getElementById('project').appendChild(text);
    document.getElementById('histlog').innerHTML += '<li><b>' + currentDate() + '</b>:' + data.name + ' added some text</li>';
});

function alterText(textbox) {
    var value = textbox.value;
    var container = textbox.parentElement.id;
    console.log(value + ' ' + container);
    socket.emit('alterText', {
        userID: userId,
        projectId: project,
        textID: container,
        text: value
    })
}

socket.on('pushTextUpdate', function(data) {
    var target = document.getElementById(data.textID);
    var textbox = target.children[0];
    textbox.value = data.text;
    document.getElementById('histlog').innerHTML += '<li><b>' + currentDate() + '</b>:' + data.name + ' altered a text item</li>';
});

function addShape(shape) {
    var date = new Date();
    var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    socket.emit('addShape', {
        userID: userId,
        projectId: project,
        shapeID: project + '-' + shape + '-' + dateString,
        shape: shape,
        height: '300px',
        width: '300px',
        left: 0,
        top: 0
    });
}

socket.on('newShape', function (data) {
    var shapeDiv = document.createElement('div');
    shapeDiv.style.position = 'absolute';
    shapeDiv.style.height = data.height;
    shapeDiv.style.width = data.width;
    shapeDiv.style.left = data.left;
    shapeDiv.style.top = data.top;
    shapeDiv.style.background = "url('/images/" + data.shape + ".png') top no-repeat";
    shapeDiv.style.backgroundSize = "100% 100%";
    shapeDiv.style.zIndex = 5;
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
        'translate(' + Math.round(x) + 'px, ' + Math.round(y) + 'px)';
    target.setAttribute('data-x', Math.round(x));
    target.setAttribute('data-y', Math.round(y));
}

interact('.draggable')
    .draggable({
        inertia: false,
        restrict: {
            restriction: 'parent',
            elementRect: {
                top: 0,
                left: 0,
                bottom: 1,
                right: 1
            }
        },
        autoScroll: false,
        onmove: dragMoveListener,
        onend: function (event) {
            var id = document.getElementById(event.target.id).id;
            var x = getPosition(document.getElementById(event.target.id)).left;
            var y = getPosition(document.getElementById(event.target.id)).top;
            var scroll = Math.round(window.scrollY);
            var yMod = 435 - scroll;
            var finalY = y - yMod;
            if (finalY < 0) {
                finalY = 0;
            }
            socket.emit('dragText', {
                userID: userId,
                name: username,
                project: project,
                textID: id,
                newX: x,
                newY: finalY
            });
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
            var id = document.getElementById(event.target.id).id;
            var x = getPosition(document.getElementById(event.target.id)).left;
            var y = getPosition(document.getElementById(event.target.id)).top;
            var scroll = Math.round(window.scrollY);
            var yMod = 593 - scroll;
            var finalY = y - yMod;
            if (finalY < 0) {
                finalY = 0;
            }
            socket.emit('dragShape', {
                userID: userId,
                name: username,
                project: project,
                shapeID: id,
                newX: x,
                newY: finalY
            });
        }
    })
    .resizable({
        edges: {
            left: true,
            right: true,
            bottom: true,
            top: true
        },
        restrictEdges: {
            outer: 'parent',
            endOnly: true,
        },
        restrictSize: {
            min: {
                width: 10,
                height: 10
            },
        },
        inertia: false,
        onmove: function (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);
            target.style.width = Math.round(event.rect.width) + 'px';
            target.style.height = Math.round(event.rect.height) + 'px';
            x += event.deltaRect.left;
            y += event.deltaRect.top;
            target.style.webkitTransform = target.style.transform =
                'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)';
            target.setAttribute('data-x', Math.round(x));
            target.setAttribute('data-y', Math.round(y));
        },
        onend: function (event) {
            var id = document.getElementById(event.target.id).id;
            var w = document.getElementById(event.target.id).style.width;
            var h = document.getElementById(event.target.id).style.height;
            var x = getPosition(document.getElementById(event.target.id)).left;
            var y = getPosition(document.getElementById(event.target.id)).top;
            var scroll = Math.round(window.scrollY);
            var yMod = 593 - scroll;
            var finalY = y - yMod;
            if (finalY < 0) {
                finalY = 0;
            }
            socket.emit('resizeShape', {
                userID: userId,
                name: username,
                project: project,
                shapeID: id,
                newW: w,
                newH: h,
                newX: x,
                newY: finalY
            });
        }
    });

//execute socket emits here for updating shape and text size/contents/location
socket.on('pushDragUpdate', function (data) {
    var target = '';
    if (document.getElementById(data.shapeID)) {
        target = document.getElementById(data.shapeID);
    } else if (document.getElementById(data.textID)) {
        target = document.getElementById(data.textID);
    }
    target.style.left = data.newX+'px';
    target.style.top = data.newY+'px';
    document.getElementById('histlog').innerHTML += '<li><b>' + currentDate() + '</b>:' + data.name + ' altered an item</li>';
});

socket.on('pushResizeUpdate', function(data) {
    var target = document.getElementById(data.shapeID);
    target.style.width = data.newW;
    target.style.height = data.newH;
    target.style.left = data.newX+'px';
    target.style.top = data.newY+'px';
    document.getElementById('histlog').innerHTML += '<li><b>' + currentDate() + '</b>:' + data.name + ' resized a shape</li>';
});