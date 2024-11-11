// On/Off Button Animation
const monitor = document.querySelector('.monitor');
const powerButton = monitor.querySelector('button');
powerButton.addEventListener('click', () => {
    monitor.classList.toggle('powered-off');
});

// Terminal command handling
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
}

// Handle Enter key for command execution
terminalInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const command = terminalInput.value.trim();
        if (command) {
            executeCommand(command);
            terminalInput.value = ""; // Clear input field
        }
    }
});

// Unmute and play background video on load
document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("background-video");
    video.muted = false;
    video.play().catch(error => {
        console.error("Video autoplay failed:", error);
    });
});


// Prevent text selection on terminal to make input smoother
terminalInput.addEventListener("mousedown", function (event) {
    event.preventDefault();
});
