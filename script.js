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
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');

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

