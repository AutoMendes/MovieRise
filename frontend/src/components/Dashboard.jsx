import React, { useState } from "react";
import GenreList from "../views/genres/GenreList";
import MovieList from "../views/movies/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import { House, Film, CollectionPlay } from "react-bootstrap-icons";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("movies");

    return (
        <div className="d-flex" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
            {/* Sidebar moderna */}
            <nav className="sidebar bg-dark text-white d-flex flex-column align-items-center py-4" style={{ width: "80px" }}>
                <div className="mb-4">
                    <House size={32} />
                </div>
                <ul className="nav flex-column w-100">
                    <li className="nav-item mb-3 w-100">
                        <button
                            className={`btn btn-dark w-100 d-flex flex-column align-items-center ${activeTab === "movies" ? "active" : ""}`}
                            onClick={() => setActiveTab("movies")}
                            title="Gerir Filmes"
                        >
                            <Film size={24} />
                            <span className="small mt-1">Filmes</span>
                        </button>
                    </li>
                    <li className="nav-item w-100">
                        <button
                            className={`btn btn-dark w-100 d-flex flex-column align-items-center ${activeTab === "genres" ? "active" : ""}`}
                            onClick={() => setActiveTab("genres")}
                            title="Gerir Gêneros"
                        >
                            <CollectionPlay size={24} />
                            <span className="small mt-1">Gêneros</span>
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Conteúdo principal */}
            <div className="flex-grow-1 p-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-body">
                                    <h3 className="card-title mb-4">
                                        {activeTab === "movies" ? "Gestão de Filmes" : "Gestão de Gêneros"}
                                    </h3>
                                    {activeTab === "movies" && <MovieList />}
                                    {activeTab === "genres" && <GenreList />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;