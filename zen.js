var hidden = false;


setListener();

function setListener() {
    var videoContainer = document.getElementById("movie_player");
    if (videoContainer.getAttribute('data-zen-listener') !== 'true') {
        videoContainer.setAttribute('data-zen-listener', 'true');
        document.addEventListener('keydown', toggleVisibility);
    }
}
function toggleVisibility(e) {
    if (e.target.id === 'contenteditable-root') return;
    if (e.key === "h"){
        toggle();
    }
}


const displayVals = {};
function hide() {
    setListener();
    var videoContainer = document.getElementById("movie_player");
    for (let el of videoContainer.children){
        if (el.classList.contains('ytp-cued-thumbnail-overlay')) continue;
        if (el.classList.contains('html5-video-container')) continue;
        if (el.classList.contains('ytp-upnext')) continue;
        if (el.classList.contains('ytp-spinner')) continue;
        if (window.getComputedStyle(el).display == 'none') continue;
        var key = el.id+ ' '+ el.className;
        displayVals[key] = el.style.display;
        el.style.display = 'none';
    }
    
    hidden = true;
}

function show() {
    var videoContainer = document.getElementById("movie_player");
    for (let el of videoContainer.children){
        if (el.classList.contains('ytp-cued-thumbnail-overlay')) continue;
        if (el.classList.contains('html5-video-container')) continue;
        if (el.classList.contains('ytp-upnext')) continue;
        if (el.classList.contains('ytp-spinner')) continue;
        var key = el.id+ ' '+ el.className;
        var val  = displayVals[key];
        if (val === undefined) continue;        
        el.style.display = val;
        delete displayVals[key];
    }
    
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