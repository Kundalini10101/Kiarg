// Import necessary modules
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS with options for development and production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://goatsesingularity.xyz/' 
        : 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure storage for uploaded files with Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize Multer with the defined storage configuration
const upload = multer({ storage: storage });

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Serve static files from a 'public' directory for client-side files
app.use(express.static(path.join(__dirname, 'public'))
