// Importa Firestore dal file firebase.js
import { db } from './firebase.js';
import { doc, getDoc, setDoc } from "firebase/firestore"; // Moduli per leggere/scrivere

// Variabile globale per la password
const PASSWORD = "try1";

// Funzione per gestire il navigatore delle applicazioni
function navigateTo(app) {
  switch (app) {
    case 'calendar':
      window.location.href = 'calendar.html';
      break;
    case 'todo':
      window.location.href = 'todo.html';
      break;
    case 'notes':
      window.location.href = 'notes.html';
      break;
    case 'mood':
      window.location.href = 'mood.html';
      break;
    default:
      console.error('Invalid app name!');
  }
}

// Funzione per organizzare le icone in una disposizione circolare
function arrangeIcons() {
  const icons = document.querySelectorAll('.app-icon');
  const radius = 100; // Ridotto per rendere il layout più compatto
  const angleStep = (2 * Math.PI) / icons.length;

  icons.forEach((icon, index) => {
    const angle = index * angleStep;
    const x = radius * Math.cos(angle); // Posizione x
    const y = radius * Math.sin(angle); // Posizione y
    icon.style.left = `calc(50% + ${x}px)`; // Centra rispetto al container
    icon.style.top = `calc(50% + ${y}px)`; // Centra rispetto al container
    icon.style.transform = `translate(-50%, -50%)`; // Rimuove lo spostamento aggiuntivo
  });
}

document.addEventListener('DOMContentLoaded', arrangeIcons);

// Funzione per controllare la password
function checkPassword() {
  const enteredPassword = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (enteredPassword === PASSWORD) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";

    // Carica i dati dal database
    loadDataFromFirestore();
  } else {
    errorMessage.textContent = "Password errata. Riprova.";
  }
}

// Funzione per caricare i dati da Firestore
async function loadDataFromFirestore() {
  const docRef = doc(db, "user_data", "notes");

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      populateUI(data);
    } else {
      console.log("Nessun dato trovato!");
    }
  } catch (error) {
    console.error("Errore nel caricamento dei dati:", error);
  }
}

// Funzione per salvare i dati su Firestore
async function saveDataToFirestore(data) {
  const docRef = doc(db, "user_data", "notes");

  try {
    await setDoc(docRef, data);
    console.log("Dati salvati con successo!");
  } catch (error) {
    console.error("Errore nel salvataggio dei dati:", error);
  }
}

// Funzione per salvare una nuova nota
function saveNote() {
  const note = document.getElementById("note-input").value;

  const data = {
    note: note,
    timestamp: new Date().toISOString()
  };

  saveDataToFirestore(data);
}

// Funzione per aggiornare l'interfaccia utente
function populateUI(data) {
  document.getElementById("note-display").textContent = data.note || "Nessuna nota";
}
