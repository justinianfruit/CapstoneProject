//nav functionality

var open = false;
function clickBurger() {
    var nav = document.getElementById('navbar');
    if (document.body.contains(nav)) {
        //expanding nav when scaled down
        var hamburger = document.getElementById("hamburger");
        hamburger.onclick = function () {
            if (open) {
                open = false;
            } else {
                open = true;
            }
            displayNav();
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
        ["Logout", "/logout"]
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