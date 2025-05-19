const express = require('express');
const multer = require('multer');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Configure multer with memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Criar um novo filme
router.post("/create", upload.single("photo"), movieController.filme_create);

router.get("/seed", movieController.filme_seed);

// Listar todos os filmes
router.get('/list', movieController.filme_list);

// Detalhar um filme específico
router.get('/get/:id', movieController.filme_detail);

// Atualizar um filme específico
router.put('/update/:id', movieController.filme_update);

// Excluir um filme específico
router.delete('/delete/:id', movieController.filme_delete);

module.exports = router;