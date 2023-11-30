import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Pokemon } from "./Pokemon";
import { PokemonTeam } from './PokemonTeam';
import { collection, onSnapshot } from "firebase/firestore";
import {RegresarInicio} from './RegresarInicio';
import {ReiniciarPokedex} from './ReiniciarPokedex';
import {db} from '../firebase/firebaseConfig';
import { BarraBusqueda } from './BarraBusqueda';


export const Pokedex = () => {
    const [pokemones, setPokemones] = useState([]);
    const [team, setTeam] = useState([]);
    const [page, setPage] = useState(1);
    const [showTeam, setShowTeam] = useState(false); // Nuevo estado para controlar la visibilidad del equipo
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${(page - 1) * 15}`;


    useEffect(() => {
        axios.get(url).then(response => {
            const pokemonList = response.data.results;
            const pokemonPromises = pokemonList.map(pokemon => axios.get(pokemon.url));
            Promise.all(pokemonPromises).then(pokemonResponses => {
                const pokemonData = pokemonResponses.map(res => ({
                    ...res.data,
                    image: res.data.sprites.front_default,
                    sprites: res.data.sprites
                }));
                setPokemones(pokemonData);
            });
        });
    }, [page]);

    useEffect(() => {
        // Observa cambios en la colección de 'equipo' y actualiza el estado
        const unsubscribe = onSnapshot(collection(db, "equipo"), (snapshot) => {
            const updatedTeam = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTeam(updatedTeam);
        });

        // Limpiar la suscripción al desmontar
        return () => unsubscribe();
    }, []);



    const buscarPokemon = (nombre) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;
        axios.get(url).then(response => {
            const pokemonData = {
                ...response.data,
                image: response.data.sprites.front_default, // Asegúrate de que esta línea está correcta
            };
            setResultadosBusqueda([pokemonData]);
        }).catch(error => {
            console.error('Error al buscar el Pokémon:', error);
            setResultadosBusqueda([]);
        });
    };
    

    return (
      <div className="main-content">
      
      <button className="boton-ver-equipo"  onClick={() => setShowTeam(!showTeam)}>
        {showTeam ? 'Ocultar Equipo' : 'Ver Equipo'}
      </button>
      <BarraBusqueda onBuscar={buscarPokemon} />
      <RegresarInicio setPage={setPage} />
      <ReiniciarPokedex setResultadosBusqueda={setResultadosBusqueda} />
       
      {showTeam && <PokemonTeam team={team} setTeam={setTeam} />}
      <div className="pokemon-grid">
        {resultadosBusqueda.length > 0 ?
          resultadosBusqueda.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} />
          )) :
          pokemones.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </div>
     
      <div>
        {page !== 1 && <button onClick={() => setPage(page - 1)}>Anterior</button>}
        <button onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>
    </div>
  );
    
};
