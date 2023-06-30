const toggle = document.getElementById("workModeToggle");

// Request the current state when options page is loaded
browser.runtime.sendMessage({command: "getWorkModeState"}).then((isWorkMode) => {
    toggle.checked = isWorkMode;
});

// Listen for the checkbox change event
toggle.addEventListener("change", (event) => {
    browser.runtime.sendMessage({
        command: "toggleWorkMode",
        enabled: event.target.checked
    });
});
