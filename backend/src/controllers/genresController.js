const Genre = require('../models/Genre');

const genresController = {};

// Listar todos os gêneros
genresController.list = async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Criar um novo gênero
genresController.create = async (req, res) => {
    try {
        const { description } = req.body;
        const newGenre = await Genre.create({ description });
        res.status(201).json(newGenre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualizar um gênero
genresController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const genre = await Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: "Gênero não encontrado" });
        }

        await genre.update({ description });
        res.json({ message: "Gênero atualizado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Excluir um gênero
genresController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const genre = await Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: "Gênero não encontrado" });
        }

        await genre.destroy();
        res.json({ message: "Gênero excluído com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Detalhar um gênero específico
genresController.detail = async (req, res) => {
    try {
        const { id } = req.params;

        const genre = await Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: "Gênero não encontrado" });
        }

        res.json(genre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = genresController;