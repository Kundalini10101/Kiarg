// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Load dark mode state
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) document.body.classList.add('dark-mode');
});

// Image upload and gallery display (Client-side display of selected image)
const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const captionInput = document.getElementById('captionInput');
const gallery = document.getElementById('gallery');

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = imageInput.files[0];
    const caption = captionInput.value;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.alt = caption;

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const captionText = document.createElement('p');
            captionText.classList.add('caption');
            captionText.innerText = caption;

            galleryItem.appendChild(imgElement);
            galleryItem.appendChild(captionText);
            gallery.appendChild(galleryItem);

            // Clear inputs after upload
            imageInput.value = "";
            captionInput.value = "";
        };
        reader.readAsDataURL(file);
    }
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

const commands = {
    help: "Available commands: help, time, about, greet, cat, galaxy, clear",
    time: () => `Current time is: ${new Date().toLocaleTimeString()}`,
    about: "This is the Terminal of Truths.",
    greet: "Hello, user. Welcome to the adventure!",
    cat: "You are a true friend of the cats!",
    galaxy: "Exploring the galaxy... buckle up!",
    clear: function() {
        terminalOutput.innerHTML = "";
    }
};

// Adding 30 extra commands for fun
for (let i = 1; i <= 30; i++) {
    commands[`command${i}`] = `Response for command${i}`;
}

function executeCommand(command) {
    let output = commands[command];
    
    if (typeof output === 'function') {
        output = output();
    } else if (!output) {
        output = `Unknown command: ${command}`;
    }

    const commandOutput = document.createElement("div");
    commandOutput.innerHTML = `> ${command}<br>${output}<br><br>`;
    terminalOutput.appendChild(commandOutput);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const command = terminalInput.value.trim();
        executeCommand(command);
        terminalInput.value = "";
    }
});
