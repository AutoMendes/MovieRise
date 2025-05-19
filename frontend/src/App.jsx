import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GenreList from "./views/genres/GenreList.jsx";
import GenreAdd from "./views/genres/GenreAdd.jsx";
import GenreEdit from "./views/genres/GenreEdit.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MovieAdd from "./views/movies/MovieAdd.jsx";
import MovieEdit from "./views/movies/MovieEdit.jsx";
import "./App.css";
import MovieList from "./views/movies/MovieList.jsx"; 

const App = () => {
    return (
        <Router>
            <div className="d-flex flex-column vh-100">
                <Header />
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/movies/add" element={<MovieAdd />} />
                        <Route path="/movies/edit/:id" element={<MovieEdit />} />
                        <Route path="/movies" element={<MovieList />} />
                        <Route path="/genres" element={<GenreList />} />
                        <Route path="/genres/add" element={<GenreAdd />} />
                        <Route path="/genres/edit/:id" element={<GenreEdit />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;