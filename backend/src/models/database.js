var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'ai2', 
    'postgres', 
    '1234', 
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);

sequelize.sync({ force: false })
    .then(() => {
        console.log("Tabelas sincronizadas com sucesso!");
    })
    .catch((err) => {
        console.error("Erro ao sincronizar tabelas:", err);
    });

module.exports = sequelize;