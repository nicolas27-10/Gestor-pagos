import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyASB5Bm9FeTohsb6RXqaZxYLkVBmBVXC9E",
    authDomain: "gestor-ksk.firebaseapp.com",
    projectId: "gestor-ksk",
    storageBucket: "gestor-ksk.firebasestorage.app",
    messagingSenderId: "779299130818",
    appId: "1:779299130818:web:95ce03877c97b27eb95a5b"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Firestore
export const db = getFirestore(app);
