import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:3000";

const MovieEdit = ({ movieId, show, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        photo: "",
        genreId: "",
    });
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        if (show) {
            loadMovie();
            loadGenres();
        }
    }, [show]);

    const loadMovie = async () => {
        try {
            const response = await axios.get(`${baseUrl}/movies/get/${movieId}`);
            setFormData({
                title: response.data.title,
                description: response.data.description,
                photo: response.data.photo || "",
                genreId: response.data.genreId,
            });
        } catch (error) {
            console.error("Erro ao carregar o filme:", error);
            alert("Erro ao carregar o filme. Verifique o console para mais detalhes.");
        }
    };

    const loadGenres = async () => {
        try {
            const response = await axios.get(`${baseUrl}/genres/list`);
            setGenres(response.data);
        } catch (error) {
            console.error("Erro ao carregar os gêneros:", error);
            alert("Erro ao carregar os gêneros. Verifique o console para mais detalhes.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${baseUrl}/movies/update/${movieId}`, formData);
            alert("Filme atualizado com sucesso!");
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar o filme:", error);
            alert("Erro ao atualizar o filme. Verifique o console para mais detalhes.");
        }
    };

    return (
        <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Filme</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label htmlFor="title">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="description">Descrição</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="photo">Caminho da Foto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="photo"
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="genreId">Gênero</label>
                                <select
                                    className="form-control"
                                    id="genreId"
                                    name="genreId"
                                    value={formData.genreId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione um gênero</option>
                                    {genres.map((genre) => (
                                        <option key={genre.id} value={genre.id}>
                                            {genre.description}
                                        </option>
                                    ))}
                                </select>
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

export default MovieEdit;