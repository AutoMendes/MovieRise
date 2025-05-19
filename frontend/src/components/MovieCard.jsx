import React from "react";

const MovieCard = ({ movie, onDetails, onEdit, onDelete }) => (
    <div
        className="card shadow-sm mx-2 text-center"
        style={{ width: "220px", minWidth: "220px" }}
    >
        <div
            style={{
                width: "220px",
                height: "220px",
                overflow: "hidden",
            }}
        >
            <img
                src={`uploads/${movie.photo}`}
                alt={movie.title}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                }}
            />
        </div>
        <div className="card-body p-2">
            <h5 className="card-title mb-2" style={{ fontSize: "1.1rem" }}>
                {movie.title}
            </h5>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onDetails(movie)}
                >
                    Detalhes
                </button>
                <button
                    className="btn btn-info btn-sm"
                    onClick={() => onEdit(movie)}
                >
                    Editar
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(movie.id)}
                >
                    Excluir
                </button>
            </div>
        </div>
    </div>
);

export default MovieCard;

