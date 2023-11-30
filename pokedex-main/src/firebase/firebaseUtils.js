import { collection, query, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import {db} from './firebaseConfig';




import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // Aquí podrías hacer algo con el resultado, como guardar en estado
    return result;
  } catch (error) {
    console.error(error);
    // Manejo de errores
  }
};


export const addPokemonToTeam = async (pokemon) => {
  try {
    const pokemonCollectionRef = collection(db, 'equipo');
    const q = query(pokemonCollectionRef);
    const querySnapshot = await getDocs(q);
    const team = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (team.length >= 6) {
      const confirmation = window.confirm(
        'El equipo ya tiene 6 Pokémon. ¿Deseas reemplazar uno existente?'
      );

      if (!confirmation) {
        throw new Error('No se puede agregar más, el equipo está completo.');
      }

      // Prompt the user for the name of the Pokémon to replace
      const pokemonToReplaceName = prompt('Selecciona el nombre de un Pokémon para reemplazar:');
      if (!pokemonToReplaceName) {
        throw new Error('Operación cancelada. No se agregó ningún Pokémon.');
      }

      // Find the index of the Pokémon to replace based on the name
      const indexToReplace = team.findIndex((p) => p.name === pokemonToReplaceName);

      if (indexToReplace === -1) {
        throw new Error(`No se encontró ningún Pokémon con el nombre '${pokemonToReplaceName}' en el equipo.`);
      }

      // Check if the new Pokémon already exists in the team
      if (team.some((p) => p.name === pokemon.name)) {
        throw new Error(`El Pokémon '${pokemon.name}' ya está en el equipo.`);
      }

      // Get the ID of the existing Pokémon to replace
      const existingPokemonId = team[indexToReplace].id;

      // Update the existing Pokémon in Firestore with the new Pokémon data
      const existingPokemonDocRef = doc(pokemonCollectionRef, existingPokemonId);
      await setDoc(existingPokemonDocRef, {
        name: pokemon.name,
        image: pokemon.image,
        types: pokemon.types,
        stats: pokemon.stats,
      });

      // Update the team array with the new Pokémon data
      team[indexToReplace] = {
        id: existingPokemonId,
        name: pokemon.name,
        image: pokemon.image,
        types: pokemon.types,
        stats: pokemon.stats,
      };
    } else {
      // Check if the new Pokémon already exists in the team
      if (team.some((p) => p.name === pokemon.name)) {
        throw new Error(`El Pokémon '${pokemon.name}' ya está en el equipo.`);
      }

      // Add the new Pokémon to the team if there's space
      const newPokemonDocRef = await addDoc(pokemonCollectionRef, {
        name: pokemon.name,
        image: pokemon.image,
        types: pokemon.types,
        stats: pokemon.stats,
      });

      // Update the team array with the new Pokémon data
      team.push({
        id: newPokemonDocRef.id,
        name: pokemon.name,
        image: pokemon.image,
        types: pokemon.types,
        stats: pokemon.stats,
      });
    }

    return 'Pokémon agregado al equipo exitosamente.';
  } catch (error) {
    throw error;
  }
};
