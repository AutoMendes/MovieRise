const Sequelize = require('sequelize');
const sequelize = require('./database');
const Genre = require('./Genre');

const Movie = sequelize.define('movie', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    photo: Sequelize.STRING,
    genreId: {
        type: Sequelize.INTEGER,
        references: {
            model: Genre,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

// Relação 1:N
Genre.hasMany(Movie, { foreignKey: 'genreId' });
Movie.belongsTo(Genre, { foreignKey: 'genreId' });

module.exports = Movie;