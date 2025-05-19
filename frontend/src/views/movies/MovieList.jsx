import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MovieDetailsModal from "./MovieDetailsModal.jsx";
import MovieEdit from "./MovieEdit.jsx";
import MovieAdd from "./MovieAdd.jsx"

const urlAPI = "http://localhost:3000/movies/list";
const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // 3 por linha, 3 linhas por página

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        axios.get(urlAPI).then(
            (response) => {
                setMovies(response.data);
            }
        ).catch((error) => {
            console.error("Erro ao carregar os filmes:", error);
        })
    };

    const handleEdit = (movie) => {
        setSelectedMovie(movie);
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedMovie(null);
        loadMovies();
    };

    const handleDetailsClick = (movie) => {
        setSelectedMovie(movie);
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedMovie(null);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este filme?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/movies/delete/${id}`);
                alert("Filme excluído com sucesso!");
                loadMovies();
            }
            catch (error) {
                console.error("Erro ao excluir o filme:", error);
                alert("Erro ao excluir o filme. Verifique o console para mais detalhes.");
            }
        }
    };

    const handleAddMovieClick = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        loadMovies();
    };

    // Paginação
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Divide os filmes em linhas de 3
    const rows = [];
    for (let i = 0; i < currentMovies.length; i += 3) {
        rows.push(currentMovies.slice(i, i + 3));
    }

    return (
        <div className="container mt-4">
            <h2>Lista de Filmes</h2>
            <button
                className="btn btn-success mb-3"
                onClick={handleAddMovieClick}
            >
                Adicionar Filme
            </button>

            <div className="row">
                {rows.map((row, rowIndex) => (
                    <div className="w-100 d-flex mb-4" key={rowIndex}>
                        {row.map((movie) => (
                            <div className="col-md-4 d-flex" key={movie.id}>
                                <div className="card flex-fill text-center shadow-sm mx-2">
                                    <img
                                        src={movie.photo}
                                        className="card-img-top"
                                        alt={movie.title}
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <div className="d-flex justify-content-center gap-2 mt-2">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleDetailsClick(movie)}
                                            >
                                                Detalhes
                                            </button>
                                            <button
                                                className="btn btn-outline-info btn-sm"
                                                onClick={() => handleEdit(movie)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDelete(movie.id)}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Paginação */}
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(movies.length / itemsPerPage) }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Modals */}
            {isDetailsModalOpen && selectedMovie && (
                <MovieDetailsModal
                    movie={selectedMovie}
                    show={isDetailsModalOpen}
                    onClose={handleCloseDetailsModal}
                />
            )}

            {isEditModalOpen && selectedMovie && (
                <MovieEdit
                    movieId={selectedMovie.id}
                    show={isEditModalOpen}
                    onClose={handleEditModalClose}
                />
            )}

            {isAddModalOpen && (
                <MovieAdd
                    show={isAddModalOpen}
                    onClose={handleCloseAddModal}
                />
            )}
        </div>
    );
};

export default MovieList;