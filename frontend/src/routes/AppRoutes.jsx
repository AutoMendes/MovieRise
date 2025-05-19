import React from "react";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MovieRoutes from "./MovieRoutes.jsx";
import GenreRoutes from "./GenreRoutes.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <div className="d-flex flex-column vh-100">
                <Header />
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        {MovieRoutes()}
                        {GenreRoutes()}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default AppRoutes;
