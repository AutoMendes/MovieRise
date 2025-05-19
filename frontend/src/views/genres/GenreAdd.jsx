import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const GenreAdd = ({ show, onClose, onSaved }) => {
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/genres/create", { description });
            alert("Gênero adicionado com sucesso!");
            setDescription("");
            onSaved();
        } catch (error) {
            alert("Erro ao adicionar o gênero.");
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Adicionar Gênero</h5>
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
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GenreAdd;