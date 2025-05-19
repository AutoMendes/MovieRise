import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MovieDetailsModal from "./MovieDetailsModal.jsx";
import MovieEdit from "./MovieEdit.jsx";
import MovieAdd from "./MovieAdd.jsx";
import MovieCard from "../../components/MovieCard.jsx";

const urlAPI = "http://localhost:3000/movies/list";
const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        try {
            const response = await axios.get(urlAPI);
            setMovies(response.data);
        } catch (error) {
            console.error("Erro ao carregar os filmes:", error);
        }
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
        const result = await Swal.fire({
            title: "Tem a certeza que pretende eliminar o filme?",
            text: "Esta ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/movies/delete/${id}`);
                await Swal.fire("Excluído!", "Filme excluído com sucesso!", "success");
                loadMovies();
            } catch (error) {
                console.error("Erro ao excluir o filme:", error);
                Swal.fire("Erro!", "Erro ao excluir o filme. Verifique o console para mais detalhes.", "error");
            }
        } else {
            Swal.fire("Cancelado", "A exclusão do filme foi cancelada.", "info");
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
                                <MovieCard
                                    movie={movie}
                                    onDetails={handleDetailsClick}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
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
                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
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