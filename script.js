// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Theme Customization
function setTheme(color) {
    document.documentElement.style.setProperty('--main-color', color);
}

// Load dark mode state
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) document.body.classList.add('dark-mode');
});

// User Profile Handling
const userNameInput = document.getElementById('userName');
document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const userName = userNameInput.value;
    localStorage.setItem('userName', userName);
    alert(`Welcome, ${userName}!`);
});

// Image upload, comment, like, download, and share functionality
const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const captionInput = document.getElementById('captionInput');
const gallery = document.getElementById('gallery');

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = imageInput.files[0];
    const caption = captionInput.value;
    const userName = localStorage.getItem('userName') || 'Anonymous';

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.alt = caption;

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const captionText = document.createElement('p');
            captionText.classList.add('caption');
            captionText.innerText = `${caption} by ${userName}`;

            const likeButton = document.createElement('button');
            likeButton.innerText = '❤️ 0';
            let likes = 0;
            likeButton.addEventListener('click', () => {
                likes += 1;
                likeButton.innerText = `❤️ ${likes}`;
            });

            const commentButton = document.createElement('button');
            commentButton.innerText = '💬 Comment';
            commentButton.addEventListener('click', () => {
                const comment = prompt('Enter your comment:');
                if (comment) {
                    const commentElement = document.createElement('p');
                    commentElement.innerText = `${userName}: ${comment}`;
                    galleryItem.appendChild(commentElement);
                }
            });

            const downloadButton = document.createElement('a');
            downloadButton.innerText = '⬇️ Download';
            downloadButton.href = e.target.result;
            downloadButton.download = `${caption}.png`;

            const shareButton = document.createElement('button');
            shareButton.innerText = '📤 Share';
            shareButton.addEventListener('click', () => {
                alert(`Share this link: ${e.target.result}`);
            });

            galleryItem.appendChild(imgElement);
            galleryItem.appendChild(captionText);
            galleryItem.appendChild(likeButton);
            galleryItem.appendChild(commentButton);
            galleryItem.appendChild(downloadButton);
            galleryItem.appendChild(shareButton);
            gallery.appendChild(galleryItem);
        };
        reader.readAsDataURL(file);
    }
});
