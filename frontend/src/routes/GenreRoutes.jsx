// src/routes/GenreRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import GenreList from "../views/genres/GenreList.jsx";
import GenreAdd from "../views/genres/GenreAdd.jsx";
import GenreEdit from "../views/genres/GenreEdit.jsx";


const GenreRoutes = () => {
    return (
        <>
            <Route path="/genres" element={<GenreList />} />
            <Route path="/genres/add" element={<GenreAdd />} />
            <Route path="/genres/edit/:id" element={<GenreEdit />} />
        </>
    );
};

export default GenreRoutes;
