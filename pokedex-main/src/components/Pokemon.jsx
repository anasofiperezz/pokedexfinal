import React, { useState } from 'react';
import { addPokemonToTeam } from '../firebase/firebaseUtils'; // Asegúrate de que esta ruta sea correcta

// StatBar component to display the stats as a horizontal bar
const StatBar = ({ value, max }) => {
  const barWidth = (value / max) * 100; // Calcula el porcentaje de ancho basado en el valor de la estadística
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '50%', marginRight: '10px' }}>
        <div style={{ background: 'lightgray', width: '100%', height: '10px', borderRadius: '5px' }}>
          <div style={{ background: 'green', width: `${barWidth}%`, height: '100%', borderRadius: '5px' }} />
        </div>
      </div>
      <div style={{ width: '50%' }}>{value}</div>
    </div>
  );
};

export const Pokemon = ({ pokemon }) => {
  const [addedToTeam, setAddedToTeam] = useState(false);

  const handleAddToTeam = () => {
    addPokemonToTeam(pokemon)
      .then(documentId => {
        setAddedToTeam(true);
        console.log(`¡${pokemon.name} ha sido agregado al equipo con el ID: ${documentId}`);
      })
      .catch(error => {
        console.error('Error al agregar el Pokémon al equipo:', error.message);
      });
  };

  return (
    <div className="pokemon-card">
      <h3>{pokemon.name}</h3>
      <img src={pokemon.image} alt={`${pokemon.name} sprite`} />

      {/* Display Pokémon types */}
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <span key={type.type.name} className={`type-badge ${type.type.name}`}>
            {type.type.name.toUpperCase()}
          </span>
        ))}
      </div>

      {/* Display Pokémon stats */}
      <div className="pokemon-stats">
        <h4>Estadísticas:</h4>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: <StatBar value={stat.base_stat} max={255} />
            </li>
          ))}
        </ul>
      </div>

      {/* Button to add to team */}
      {!addedToTeam ? (
        <button onClick={handleAddToTeam}>Agregar al equipo</button>
      ) : (
        <p>Agregado al equipo</p>
      )}
    </div>
  );
};