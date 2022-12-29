window.removeEventListener("keydown", onKeyDownToggleVisibility);
window.addEventListener("keydown", onKeyDownToggleVisibility);

function onKeyDownToggleVisibility(e) {
    if (/^(input|textarea)/i.test(e.target.nodeName)) return;
    if (e.key === "h") {
        toggleContentVisibility();
    }
}

console.info("YouTube Zen loaded successfully");

const skipClasses = [
    "ytp-cued-thumbnail-overlay",
    "ytp-upnext",
    "ytp-spinner",
    "ytp-caption-window-container",
    "html5-endscreen",
    "ytp-autonav-endscreen-countdown-overlay",
];

function toggleContentVisibility(show) {
    const showContent = show === true || (show !== false && document.body.hasAttribute("data-yt_zen-hidden"));

    const videoContainer = document.querySelector("#movie_player");

    for (const el of videoContainer.children) {
        if (el.querySelector("video")) continue;
        let skip = false;
        for (const skipCls of skipClasses) {
            if (el.classList.contains(skipCls)) {
                skip = true;
                break;
            }
        }
        if (skip) continue;

        if (showContent) {
            el.classList.remove("yt_zen-hidden");
        } else {
            el.classList.add("yt_zen-hidden");
        }
    }

    if (showContent) {
        document.body.removeAttribute("data-yt_zen-hidden");
    } else {
        document.body.setAttribute("data-yt_zen-hidden", "");
    }

    return showContent;
}

browser.runtime.onMessage.addListener(function (msg) {
    if (msg.command === "show") {
        console.info("Showing YT Controls");
        return Promise.resolve(toggleContentVisibility(true));
    } else if (msg.command === "hide") {
        console.info("Hiding YT Controls");
        return Promise.resolve(toggleContentVisibility(false));
    } else if (msg.command === "toggle") {
        console.info("Toggling YT Controls visibility");
        return Promise.resolve(toggleContentVisibility());
    } else if (msg.command === "isContentVisible") {
        return Promise.resolve(!document.body.hasAttribute("data-yt_zen-hidden"));
    } else {
        return Promise.reject("Invalid message");
    }
});
