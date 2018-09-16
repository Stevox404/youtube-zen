document.getElementById('show-btn').onclick = function () {
    showControls()
}

document.getElementById('hide-btn').onclick = function () {
    hideControls()
}

function reportExecuteScriptError() {
    console.error("Error loading script");
}




function showControls() {
    browser.tabs.query({ active: true, currentWindow: true })
        .then(tabs => {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "show"
            });
        })
        .catch(reportExecuteScriptError);
}

function hideControls() {
    browser.tabs.query({ active: true, currentWindow: true })
        .then(tabs => {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "hide"
            });
        })
        .catch(reportExecuteScriptError);
}

browser.tabs.executeScript({ file: "/zen.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);