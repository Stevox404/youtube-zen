var hidden = false;

var gradient = document.getElementsByClassName('ytp-gradient-bottom')[0];
var control = document.getElementsByClassName('ytp-chrome-bottom')[0];
var topBtns = document.getElementsByClassName('ytp-chrome-top-buttons')[0];
var title = document.getElementsByClassName('ytp-title')[0];

document.addEventListener('keypress', toggleVisibility);

function toggleVisibility(e) {
    if (e.key === "h"){
        toggle()
    }
}

function hide() {
    gradient.style.display = 'none';
    control.style.display = 'none';
    topBtns.style.display = 'none';
    title.style.display = 'none';

    hidden = true;
}

function show() {
    gradient.style.display = '';
    control.style.display = '';
    topBtns.style.display = '';
    title.style.display = '';
    
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