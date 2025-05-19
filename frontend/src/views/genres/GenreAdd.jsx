import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const GenreAdd = () => {
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/genres/create", { description });
            alert("Gênero adicionado com sucesso!");
            setDescription("");
        } catch (error) {
            console.error("Erro ao adicionar o gênero:", error);
            alert("Erro ao adicionar o gênero. Verifique o console para mais detalhes.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Adicionar Gênero</h2>
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
                    Salvar
                </button>
            </form>
        </div>
    );
};

export default GenreAdd;