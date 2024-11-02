uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = imageInput.files[0];
    const caption = captionInput.value;

    if (file) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('caption', caption);

        fetch('http://localhost:3000/upload-image', {
            method: 'POST',
            body: formData,
            mode: 'cors'  // Explicitly set mode to 'cors'
        })
        .then(response => response.json())
        .then(data => {
            const imgElement = document.createElement('img');
            imgElement.src = data.imageUrl;
            imgElement.alt = caption;

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const captionText = document.createElement('p');
            captionText.classList.add('caption');
            captionText.innerText = caption;

            galleryItem.appendChild(imgElement);
            galleryItem.appendChild(captionText);
            gallery.appendChild(galleryItem);
        })
        .catch(error => console.error('Error uploading image:', error));
    }
});
