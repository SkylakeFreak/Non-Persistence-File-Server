const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // This line enables CORS for all origins

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp'); // Store files in the /tmp directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const oldPath = path.join('/tmp', req.file.filename);
    const fileExtension = path.extname(req.file.originalname);
    const newFileName = req.body.code+req.body.file2 + fileExtension;
    const newPath = path.join('/tmp', newFileName);

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
            return res.status(500).send('Error renaming file');
        }
        console.log('File renamed successfully');
        res.send('Form data and file received and renamed');
    });

    console.log('Received form data:', req.body);
    console.log('Received file:', req.file);
});

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join('/tmp', filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('Error sending file');
            }
            console.log('File sent successfully');
        });
    } else {
        res.status(404).send('File not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
