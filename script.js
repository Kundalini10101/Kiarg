// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
}

// Load dark mode state
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) document.body.classList.add('dark-mode');
});

// On/Off Button Animation
const monitor = document.querySelector('.monitor');
const powerButton = monitor.querySelector('button');
powerButton.addEventListener('click', () => {
    monitor.classList.toggle('powered-off');
});

// Terminal commands
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

function executeCommand(command) {
    let output;
    const date = new Date();

    switch (command) {
        case "help":
            output = "Available commands: help, time, about";
            break;
        case "time":
            output = `Current time is: ${date.toLocaleTimeString()}`;
            break;
        case "about":
            output = "This is the Terminal of Truths.";
            break;
        default:
            output = `Unknown command: ${command}`;
    }

    terminalOutput.innerText += `> ${command}\n${output}\n\n`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom
    terminalInput.focus(); // Keep input field focused
}

// Handle keydown event (use `keydown` instead of `keypress` for better support)
terminalInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const command = terminalInput.value.trim();
        if (command) {
            executeCommand(command);
            terminalInput.value = ""; // Clear input field
        }
    }
});

// Prevent text selection on terminal to make input smoother
terminalInput.addEventListener("mousedown", function (event) {
    event.preventDefault();
});
