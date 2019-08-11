var hidden = false;

var gradientTop = document.getElementsByClassName('ytp-gradient-top')[0];
var gradientBtm = document.getElementsByClassName('ytp-gradient-bottom')[0];
var control = document.getElementsByClassName('ytp-chrome-bottom')[0];
var topBtns = document.getElementsByClassName('ytp-chrome-top-buttons')[0];
var title = document.getElementsByClassName('ytp-title')[0];
var annotation = document.getElementsByClassName('annotation')[0];

// var player =
//           document.getElementById('movie_player') ||
//           document.getElementsByTagName('embed')[0];

document.addEventListener('keypress', toggleVisibility);

function toggleVisibility(e) {
    if (e.key === "h"){
        toggle()
    }
}

function hide() {
    gradientTop.style.display = 'none';
    gradientBtm.style.display = 'none';
    control.style.display = 'none';
    topBtns.style.display = 'none';
    title.style.display = 'none';
    annotation.style.display = 'none';

    hidden = true;
}

function show() {
    gradientTop.style.display = '';
    gradientBtm.style.display = '';
    control.style.display = '';
    topBtns.style.display = '';
    title.style.display = '';
    annotation.style.display = '';
    
    hidden = false;
}

function toggle() {
    if(hidden){
        show();
    } else {
        hide();
    }
}

browser.runtime.onMessage.addListener(function (msg) {
    if (msg.command === "show") {
        console.info("Showing YT Controls");
        show();
    }
    else if (msg.command === "hide") {
        console.info("Hiding YT Controls");
        hide();
    }
    else if (msg.command === "toggle") {
        console.info("Toggling YT Controls visibility");
        toggle();
    }
});