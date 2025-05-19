
import React from "react";
import { Route } from "react-router-dom";
import MovieAdd from "../views/movies/MovieAdd.jsx";
import MovieEdit from "../views/movies/MovieEdit.jsx";
import MovieList from "../views/movies/MovieList.jsx";


const MovieRoutes = () => {
    return (
        <>
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/add" element={<MovieAdd />} />
            <Route path="/movies/edit/:id" element={<MovieEdit />} />
        </>
    );
};

export default MovieRoutes;
