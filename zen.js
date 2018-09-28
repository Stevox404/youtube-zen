var gradient = document.getElementsByClassName('ytp-gradient-bottom')[0];
var control = document.getElementsByClassName('ytp-chrome-bottom')[0];
var topBtns = document.getElementsByClassName('ytp-chrome-top-buttons')[0];
var title = document.getElementsByClassName('ytp-title')[0];


function hide() {
    gradient.style.display = 'none';
    control.style.display = 'none';
    topBtns.style.display = 'none';
    title.style.display = 'none';
}

function show() {
    gradient.style.display = '';
    control.style.display = '';
    topBtns.style.display = '';
    title.style.display = '';
}

browser.runtime.onMessage.addListener(function (msg) {
    if (msg.command === "show") {
        console.info("Showing YT Controls");
        show();
    }
    if (msg.command === "hide") {
        console.info("Hiding YT Controls");
        hide();
    }
});