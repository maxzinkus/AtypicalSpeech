const { Router } = require('express');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const router = Router();

const uploadDir = path.resolve(__dirname, '../../uploads');
const uploadMedia = path.resolve(__dirname, '../../medias');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); 
}

if (!fs.existsSync(uploadMedia)) {
    fs.mkdirSync(uploadMedia); 
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const mediaStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'medias/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
const uploadM = multer({ storage: mediaStorage });

router.post('/', upload.single('filename'), (req, res) => {
    try {
        res.send(req.file);
    } catch(err) {
        res.send(400);
    }
});

router.post('/media', uploadM.single('filename'), (req, res) => {
    try {
        res.send(req.file);
    } catch(err) {
        res.send(400);
    }
});

module.exports = router;