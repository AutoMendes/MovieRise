// Sidebar.jsx
import React from "react";
import { House, Film, CollectionPlay } from "react-bootstrap-icons";

const Sidebar = ({ activeTab, onTabChange }) => (
    <nav className="sidebar bg-dark text-white d-flex flex-column align-items-center py-4" style={{ width: "80px" }}>
        <div className="mb-4">
            <House size={32} />
        </div>
        <ul className="nav flex-column w-100">
            <li className="nav-item mb-3 w-100">
                <button
                    className={`btn btn-dark w-100 d-flex flex-column align-items-center ${activeTab === "movies" ? "active" : ""}`}
                    onClick={() => onTabChange("movies")}
                    title="Gerir Filmes"
                >
                    <Film size={24} />
                    <span className="small mt-1">Filmes</span>
                </button>
            </li>
            <li className="nav-item w-100">
                <button
                    className={`btn btn-dark w-100 d-flex flex-column align-items-center ${activeTab === "genres" ? "active" : ""}`}
                    onClick={() => onTabChange("genres")}
                    title="Gerir Gêneros"
                >
                    <CollectionPlay size={24} />
                    <span className="small mt-1">Gêneros</span>
                </button>
            </li>
        </ul>
    </nav>
);

export default Sidebar;