var Sequelize = require('sequelize');
var sequelize = require('./database');

var Genre = sequelize.define('genre', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
});

Genre.associate = function(models) {
    Genre.hasMany(models.Movie, { foreignKey: 'genreId' });
};

module.exports = Genre;
