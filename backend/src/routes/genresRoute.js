const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

// Listar todos os gêneros
router.get('/list', genresController.list);

// Criar um novo gênero
router.post('/create', genresController.create);

// Atualizar um gênero
router.put('/update/:id', genresController.update);

// Excluir um gênero
router.delete('/delete/:id', genresController.delete);

// listar um gênero específico
router.get('/:id ', genresController.detail);

module.exports = router;