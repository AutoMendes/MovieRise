import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const GenreEdit = ({ show, genreId, onClose, onSaved }) => {
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (show && genreId) {
            loadGenre();
        }
    }, [show, genreId]);

    const loadGenre = async () => {
        try {
            const response = await axios.get("http://localhost:3000/genres/list");
            const genre = response.data.find((g) => g.id === genreId);
            if (genre) setDescription(genre.description);
        } catch (error) {
            alert("Erro ao carregar o gênero.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/genres/update/${genreId}`, { description });
            alert("Gênero atualizado com sucesso!");
            onSaved();
        } catch (error) {
            alert("Erro ao atualizar o gênero.");
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Gênero</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label>Descrição</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Fechar
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GenreEdit;