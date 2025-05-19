import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const MovieDetailsModal = ({ movie, show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: "block", zIndex: 1050 }} tabIndex="-1" aria-labelledby="movieDetailsModal" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="movieDetailsModal">{movie.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                src={`/uploads/${movie.photo}`}
                                alt={movie.title}
                                style={{ width: "200px", height: "300px", objectFit: "cover" }}
                            />
                            <h4 className="mt-3">Descrição</h4>
                            <p>{movie.description}</p>
                            <h4 className="mt-3">Gênero</h4>
                            <p>{movie.genre?.description || "Não especificado"}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsModal;