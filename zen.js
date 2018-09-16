var gradient = document.getElementsByClassName('ytp-gradient-bottom')[0];
var control = document.getElementsByClassName('ytp-chrome-bottom')[0];


function hide(){
    gradient.style.display = 'none';
    control.style.display = 'none';
}

function show(){
    gradient.style.display = '';
    control.style.display = '';
}


browser.runtime.onMessage.addListener((msg) => {
    if(msg.command === "show"){
        console.info("Showing YT Controls");
        show();
    }
    if(msg.command === "hide"){
        console.info("Hiding YT Controls");
        hide();
    }
})