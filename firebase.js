// Importa le funzioni necessarie da Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"; // Per Firestore
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"; // Per Authentication
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js"; // Facoltativo

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

// Inizializza Authentication
const auth = getAuth(app);

// Inizializza Analytics (facoltativo)
const analytics = getAnalytics(app);

// Esporta Firestore, Authentication e Analytics (se necessario)
export { db, auth, analytics };
