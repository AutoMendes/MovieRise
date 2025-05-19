
import React from "react";
import { Route } from "react-router-dom";
import MovieList from "../components/MovieList";
import MovieAdd from "../components/MovieAdd";
import MovieEdit from "../components/MovieEdit";

const MovieRoutes = () => {
    return (
        <>
            <Route path="/" element={<h1>Movies</h1>} />
            <Route path="/movies/add" element={<MovieAdd />} />
            <Route path="/movies/edit/:id" element={<MovieEdit />} />
            <Route path="/movies" element={<MovieList />} />
        </>
    );
};

export default MovieRoutes;
