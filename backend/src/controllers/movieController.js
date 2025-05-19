const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const path = require("path");
const fs = require("fs");

const controllers = {};

controllers.filme_seed = async (req, res) => {
    try {
        // Verifica se os géneros 1, 2 e 3 existem
        const requiredGenres = await Genre.findAll({ where: { id: [1, 2, 3] } });
        if (requiredGenres.length < 3) {
            return res.status(400).json({ error: "Géneros com IDs 1, 2 e 3 devem existir para inserir os filmes de teste." });
        }

        const moviesData = [
            {
                title: "O Senhor dos Anéis",
                description: "Uma jornada épica na Terra Média.",
                genreId: 1
            },
            {
                title: "Matrix",
                description: "Um hacker descobre a verdadeira natureza da sua realidade.",
                genreId: 2
            },
            {
                title: "A Origem",
                description: "Exploração de sonhos dentro de sonhos.",
                genreId: 3
            }
        ];

        for (const movieData of moviesData) {
            await Movie.create({
                ...movieData,
                photo: "/uploads/pvestgv.png"
            });
        }

        res.json({ message: "Filmes de teste inseridos com sucesso." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


controllers.filme_create = async (req, res) => {
    try {
        const { title, description, genreId } = req.body;

        // Verifica se o gênero existe
        const genre = await Genre.findByPk(genreId);
        if (!genre) {
            return res.status(400).json({ error: "Gênero não encontrado." });
        }

        // Verifica se um arquivo foi enviado
        let photoPath = null;
        if (req.file) {
            const uploadDir = path.join(__dirname, "../../../frontend/public/uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const fileName = `${req.file.originalname}`;
            photoPath = fileName
            fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
        }

        const newMovie = await Movie.create({
            title,
            description,
            photo: photoPath,
            genreId
        });

        res.status(201).json(newMovie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controllers.filme_list = async (req, res) => {
    try {
        const movies = await Movie.findAll({
            include: {
                model: Genre,
                attributes: ["id", "description"]
            }
        });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controllers.filme_detail = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id, {
            include: {
                model: Genre,
                attributes: ["id", "description"]
            }
        });

        if (!movie) {
            return res.status(404).json({ error: "Filme não encontrado" });
        }

        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controllers.filme_update = async (req, res) => {
    try {
        const { title, description, photo, genreId } = req.body;

        const movie = await Movie.findByPk(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: "Filme não encontrado" });
        }

        // Verifica se o gênero existe
        const genre = await Genre.findByPk(genreId);
        if (!genre) {
            return res.status(400).json({ error: "Gênero não encontrado." });
        }

        // Atualiza o filme com o caminho da foto recebido como texto
        await movie.update({ title, description, photo, genreId });

        res.json({ message: "Filme atualizado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controllers.filme_delete = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: "Filme não encontrado" });
        }

        await movie.destroy();
        res.json({ message: "Filme excluído com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = controllers;