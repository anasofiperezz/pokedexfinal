import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { signInWithGoogle } from '../firebase/firebaseUtils';
import './home.css';
export const Home = () => {
  const { currentUser } = useAuth();
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [pokemonIndex, setPokemonIndex] = useState(1);
  const [lights, setLights] = useState({ blue: false, green: false, yellow: false });
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
        setCurrentPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    if (currentUser) {
      fetchPokemon();
    }
  }, [currentUser, pokemonIndex]);

  useEffect(() => {
    const lightSequence = ['blue', 'green', 'yellow'];
    let currentLight = 0;

    const switchLights = () => {
      setLights({ 
        blue: false, 
        green: false, 
        yellow: false,
        [lightSequence[currentLight]]: true 
      });

      setPokemonIndex(prevIndex => prevIndex + 1);

      currentLight = (currentLight + 1) % lightSequence.length;
    };

    if (currentUser) {
      const timer = setInterval(switchLights, 3000);
      return () => clearInterval(timer);
    }
  }, [currentUser]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  return (
    <div className="pokedex-container">
      <h2>Bienvenido a la Pokedex</h2>
      {currentUser ? (
        <>
          <p>Bienvenido, {currentUser.email}</p>
          <div className="pokedex-screen-container">
            <div className={`pokedex-screen ${Object.values(lights).some(status => status) ? 'screen-on' : ''}`}>
              {currentPokemon && (
                <div>
                  <h3>{currentPokemon.name}</h3>
                  <img src={currentPokemon.sprites.front_default} alt={currentPokemon.name} />
                </div>
              )}
            </div>
            <div className="pokedex-lights">
              <div className={`light ${lights.blue ? 'light-on blue' : ''}`}></div>
              <div className={`light ${lights.green ? 'light-on green' : ''}`}></div>
              <div className={`light ${lights.yellow ? 'light-on yellow' : ''}`}></div>
            </div>
          </div>
          <button onClick={() => navigate('/pokedex')}>Ir a la Pokedex</button>
        </>
      ) : (
        <>
          <p>Por favor inicia sesión para explorar la Pokedex.</p>
          <button onClick={handleGoogleSignIn}>Inicia sesión con Google</button>
        </>
      )}
    </div>
  );
};
