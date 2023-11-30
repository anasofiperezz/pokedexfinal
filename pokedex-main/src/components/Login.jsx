// src/components/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase/firebaseUtils'; // Asegúrate de que la ruta es correcta
import './home.css';
export const Login = () => {
  let navigate = useNavigate(); // Hook para la navegación

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/pokedex'); // Redirige a la Pokedex después de un inicio de sesión exitoso
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Inicia sesión con Google</button>
      {/* Otros elementos de tu componente */}
    </div>
  );
};
