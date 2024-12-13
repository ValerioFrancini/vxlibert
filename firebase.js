// Importa le funzioni necessarie da Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Per usare Firestore
import { getAnalytics } from "firebase/analytics"; // (Facoltativo)

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCrOKUMKdM1PIHWtF9_sbjFYOhrVOYJAjo",
  authDomain: "vxlibert.firebaseapp.com",
  projectId: "vxlibert",
  storageBucket: "vxlibert.firebasestorage.app",
  messagingSenderId: "491816836303",
  appId: "1:491816836303:web:af4398c3eee150b1672bba",
  measurementId: "G-SXY4N1JFPW"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza Firestore
const db = getFirestore(app);

// Inizializza Analytics (facoltativo)
const analytics = getAnalytics(app);

// Esporta il database per l'uso in altri file
export { db };
