let blockedUrls = [
    "*://*.facebook.com/*",
    "*://*.twitter.com/*",
    // Add more websites here
];

let isWorkMode = false;

// Load stored state from storage API
browser.storage.local.get("isWorkMode").then((result) => {
    isWorkMode = result.isWorkMode || false;
});

// Function to toggle work mode
function toggleWorkMode(enabled) {
    isWorkMode = enabled;
    // Save state to storage API
    browser.storage.local.set({isWorkMode: enabled});
}

// Handle web requests
browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        if (isWorkMode) {
            return { redirectUrl: browser.runtime.getURL("blocked.html") };
        }
    },
    { urls: blockedUrls },
    ["blocking"]
);

// Listen for messages from options page
browser.runtime.onMessage.addListener((message) => {
    if (message.command === "toggleWorkMode") {
        toggleWorkMode(message.enabled);
    }
    if (message.command === "getWorkModeState") {
        return Promise.resolve(isWorkMode);
    }
});
