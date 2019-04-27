document.getElementById('show-btn').onclick = function () {
    changeVisibility('show');
}

document.getElementById('hide-btn').onclick = function () {
    changeVisibility('hide');
}


function changeVisibility(msg) {
    if (document.getElementById('tab-opt-1').checked) {
        sendMessage({command: msg}, { active: true, currentWindow: true, });
    } else {
        sendMessage({command: msg}, {});
    }
}

function sendMessage(msg, params) {
    browser.tabs.query(params)
        .then(tabs => {
            tabs.forEach(tab => {
                console.log("Sent msg", msg, tab.id);
                browser.tabs.sendMessage(tab.id, msg);
            })
        })
        .catch(reportExecuteScriptError);
}

function reportExecuteScriptError() {
    console.error("Error loading script");
}