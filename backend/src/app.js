const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// importação de rotas [1]
const moviesRouters = require('./routes/moviesRoute');

// importação de rotas [2]
const genresRouters = require('./routes/genresRoute');
const {join} = require("node:path");

// Middlewares
app.use(express.json());

// Rota para filmes
app.use('/movies', moviesRouters);

// Rota para gêneros
app.use('/genres', genresRouters);

// Rota de teste
app.use('/teste', (req, res) => {
    res.send("Rota TESTE.");
});

// Rota principal
app.use('/', (req, res) => {
    res.send("Hello World");
});

app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Configuração do servidor
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log("Start server on port " + app.get('port'));
});
