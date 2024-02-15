import React from "react";
import "./App.css";
import Pokedex from "./components/pokedex";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonDetailsPage from "./components/detailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
