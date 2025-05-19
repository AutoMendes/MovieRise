import React, { useEffect, useState } from "react";
import axios from "axios";
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
            alert("Erro ao carregar os gêneros.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este gênero?")) {
            try {
                await axios.delete(`http://localhost:3000/genres/delete/${id}`);
                alert("Gênero excluído com sucesso!");
                loadGenres();
            } catch (error) {
                alert("Erro ao excluir o gênero.");
            }
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