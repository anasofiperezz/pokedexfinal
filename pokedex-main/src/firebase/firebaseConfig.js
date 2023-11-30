import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCvTM5PCMS0wQjR6YEOtEE3Z3Agzp8k8Q8",
  authDomain: "pokedex-1835a.firebaseapp.com",
  projectId: "pokedex-1835a",
  storageBucket: "pokedex-1835a.appspot.com",
  messagingSenderId: "74065316858",
  appId: "1:74065316858:web:b29d4f8e362c41b4fdb243"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth };
