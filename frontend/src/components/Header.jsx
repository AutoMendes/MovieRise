import React from "react";
import { Film } from "react-bootstrap-icons";
import "../App.css";

const Header = () => (
    <header className="py-3">
        <div className="container d-flex align-items-center">
            <Film size={40} className="me-3 text-danger" />
            <span className="logo">MovieRise</span>
            <span className="subtitle ms-3">ESTGV - FILMES</span>
        </div>
    </header>
);

export default Header;