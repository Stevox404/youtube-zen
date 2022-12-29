const showBtn = document.getElementById("show-btn");
const hideBtn = document.getElementById("hide-btn");

try {
    browser.tabs.query({ active: true }).then(([tab]) => {
        browser.tabs
            .sendMessage(tab.id, {
                command: "isContentVisible",
            })
            .then(disableButton);
    });
} catch (err) {
    console.error(err);
}

showBtn.onclick = async function () {
    await changeVisibility("show");
    disableButton(true);
};

hideBtn.onclick = async function () {
    await changeVisibility("hide");
    disableButton(false);
};

function disableButton(contentVisible) {
    if (contentVisible) {
        showBtn.setAttribute("disabled", "disabled");
        hideBtn.removeAttribute("disabled");
    } else {
        hideBtn.setAttribute("disabled", "disabled");
        showBtn.removeAttribute("disabled");
    }
}

async function changeVisibility(msg) {
    try {
        const tabs = await browser.tabs.query({ active: true });
        tabs.forEach((tab) => {
            try {
                browser.tabs.sendMessage(tab.id, { command: msg });
            } catch (err) {
                console.error("Zen failed: ", err);
            }
        });
    } catch (err) {
        console.error("Error loading script: ", err);
    }
}
