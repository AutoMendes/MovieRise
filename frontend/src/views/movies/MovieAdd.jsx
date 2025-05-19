import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const MovieAdd = ({ show, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        photo: null,
        genreId: "",
    });
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
            alert("Erro ao carregar os gêneros. Verifique o console para mais detalhes.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("photo", formData.photo);
        data.append("genreId", formData.genreId);

        try {
            await axios.post("http://localhost:3000/movies/create", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Filme adicionado com sucesso!");
            onClose(); // Fecha o modal após o sucesso
        } catch (error) {
            console.error("Erro ao adicionar o filme:", error);
            alert("Erro ao adicionar o filme. Verifique o console para mais detalhes.");
        }
    };

    return (
        show && (
            <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Adicionar Filme</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
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
                                    <label htmlFor="photo">Foto</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="photo"
                                        name="photo"
                                        onChange={handleFileChange}
                                        required
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
                                <button type="submit" className="btn btn-primary">
                                    Salvar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default MovieAdd;