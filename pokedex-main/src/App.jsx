// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./components/AuthContext";
import {Home} from './components/Home';
import { Pokedex } from './components/Pokedex';
import { PokemonTeam } from './components/PokemonTeam';
import { Login } from './components/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon-team" element={<PokemonTeam />} />
          <Route path="/login" element={<Login />} />
          {/* Puedes agregar más rutas según sea necesario */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

