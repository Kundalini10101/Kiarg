// Import necessary modules
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS with options (this allows only the specified origin)
// For testing, you can set 'origin' to '*' but it's recommended to specify your client URL in production
const corsOptions = {
    origin: '*', // Change '*' to your client domain, e.g., 'http://your-client-domain.com'
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// Configure storage for uploaded files with Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename with original extension
    }
});

// Initialize Multer with the defined storage configuration
const upload = multer({ storage: storage });

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Endpoint to handle image uploads
app.post('/upload-image', upload.single('image'), (req, res) => {
    // Check if the file was uploaded
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    // Construct the URL for the uploaded image
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // Send the URL as JSON response
    res.json({ imageUrl });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
