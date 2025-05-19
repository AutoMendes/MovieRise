import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const GenreEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [description, setDescription] = useState("");

    useEffect(() => {
        loadGenre();
    }, []);

    const loadGenre = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/genres/list`);
            const genre = response.data.find((g) => g.id === parseInt(id));
            if (genre) setDescription(genre.description);
        } catch (error) {
            console.error("Erro ao carregar o gênero:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/genres/update/${id}`, { description });
            alert("Gênero atualizado com sucesso!");
            navigate("/genres");
        } catch (error) {
            console.error("Erro ao atualizar o gênero:", error);
            alert("Erro ao atualizar o gênero. Verifique o console para mais detalhes.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Editar Gênero</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="description">Descrição</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Atualizar
                </button>
            </form>
        </div>
    );
};

export default GenreEdit;