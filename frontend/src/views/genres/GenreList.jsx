import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import GenreEdit from "./GenreEdit.jsx";
import GenreAdd from "./GenreAdd.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const GenreList = () => {
    const [genres, setGenres] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedGenreId, setSelectedGenreId] = useState(null);

    useEffect(() => {
        loadGenres();
    }, []);

    const loadGenres = async () => {
        try {
            const response = await axios.get("http://localhost:3000/genres/list");
            setGenres(response.data);
        } catch (error) {
            Swal.fire("Erro!", "Erro ao carregar os gêneros.", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Tem certeza que deseja excluir este gênero?",
            text: "Esta ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/genres/delete/${id}`);
                await Swal.fire("Excluído!", "Gênero excluído com sucesso!", "success");
                loadGenres();
            } catch (error) {
                Swal.fire("Erro!", "Erro ao excluir o gênero.", "error");
            }
        } else {
            Swal.fire("Cancelado", "A exclusão do gênero foi cancelada.", "info");
        }
    };

    const handleEditClick = (id) => {
        setSelectedGenreId(id);
        setEditModalOpen(true);
    };

    const handleAddClick = () => {
        setAddModalOpen(true);
    };

    return (
        <div className="container mt-4">
            <h2>Lista de Gêneros</h2>
            <button className="btn btn-success mb-3" onClick={handleAddClick}>
                Adicionar Gênero
            </button>
            <table className="table table-hover table-striped">
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {genres.map((genre, index) => (
                    <tr key={genre.id}>
                        <td>{index + 1}</td>
                        <td>{genre.description}</td>
                        <td>
                            <button
                                className="btn btn-outline-info me-2"
                                onClick={() => handleEditClick(genre.id)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => handleDelete(genre.id)}
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <GenreEdit
                show={editModalOpen}
                genreId={selectedGenreId}
                onClose={() => setEditModalOpen(false)}
                onSaved={() => {
                    setEditModalOpen(false);
                    loadGenres();
                }}
            />
            <GenreAdd
                show={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSaved={() => {
                    setAddModalOpen(false);
                    loadGenres();
                }}
            />
        </div>
    );
};

export default GenreList;