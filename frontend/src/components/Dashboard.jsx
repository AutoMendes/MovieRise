import React, { useState } from "react";
import GenreList from "../views/genres/GenreList";
import MovieList from "../views/movies/MovieList";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("movies");

    return (
        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(90deg, #212529 60%, #343a40 100%)"
            }}
        >
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

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