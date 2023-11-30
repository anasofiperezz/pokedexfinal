
import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import {db} from '../firebase/firebaseConfig';
import './PokemonTeam.css';
export const PokemonTeam = ({ team, setTeam }) => {
    // Función para manejar la eliminación de un Pokémon
    const eliminarPokemon = async (pokemonId) => {
        // Confirmación del usuario antes de la eliminación
        if (window.confirm("¿Estás seguro de querer eliminar este Pokémon del equipo?")) {
            try {
                // Referencia al documento en Firestore
                const pokemonDocRef = doc(db, "equipo", pokemonId);
                // Eliminación del documento
                await deleteDoc(pokemonDocRef);
                // Actualización del estado para reflejar los cambios
                setTeam(currentTeam => currentTeam.filter(pokemon => pokemon.id !== pokemonId));
                alert("Pokémon eliminado del equipo.");
            } catch (error) {
                console.error("Error al eliminar el Pokémon:", error);
            }
        }
    };

    return (
        <div className="pokemon-team">
              <h2>Equipo</h2>
            {team.map((pokemon) => (
                <div key={pokemon.id} className="pokemon-cart">
                    <h3>{pokemon.name}</h3>
                    <img src={pokemon.image} alt={pokemon.name} />
                    <div className="pokemon-stats">
                        <h4>Estadísticas:</h4>
                        <ul>
                            {pokemon.stats.map((stat, idx) => (
                                <li key={idx}>
                                    {stat.stat.name}: {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Botón para eliminar Pokémon del equipo */}
                    <button onClick={() => eliminarPokemon(pokemon.id)}>Eliminar del Equipo</button>
                </div>
            ))}
        </div>
    );
};

