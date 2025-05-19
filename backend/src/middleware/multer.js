const express = require('express');
const router = express.Router();
const multer = require('multer');
const movieController = require('../controllers/MovieController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// rota com upload de ficheiro
router.post('/movies/create', upload.single('photo'), movieController.filme_create);

module.exports = router;
