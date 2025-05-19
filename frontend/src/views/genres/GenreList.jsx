import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const GenreList = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        loadGenres();
    }, []);

    const loadGenres = async () => {
        try {
            const response = await axios.get("http://localhost:3000/genres/list");
            setGenres(response.data);
        } catch (error) {
            console.error("Erro ao carregar os gêneros:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este gênero?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/genres/delete/${id}`);
                alert("Gênero excluído com sucesso!");
                loadGenres();
            } catch (error) {
                console.error("Erro ao excluir o gênero:", error);
                alert("Erro ao excluir o gênero. Verifique o console para mais detalhes.");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Lista de Gêneros</h2>
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
                            <Link to={`/genres/edit/${genre.id}`} className="btn btn-outline-info me-2">
                                Editar
                            </Link>
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
        </div>
    );
};

export default GenreList;