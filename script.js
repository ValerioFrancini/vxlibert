// Variabile globale per la password
const PASSWORD = "try1";

// Funzione per controllare la password
function checkPassword() {
  const enteredPassword = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  console.log("Password inserita:", enteredPassword);

  if (enteredPassword === PASSWORD) {
    console.log("Password corretta!");
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";

    // Carica i dati dal database
    loadDataFromFirestore();
  } else {
    console.log("Password errata!");
    errorMessage.textContent = "Password errata. Riprova.";
  }
}

// Inizializza Firebase usando CDN
const firebaseConfig = {
  apiKey: "AIzaSyCrOKUMKdM1PIHWtF9_sbjFYOhrVOYJAjo",
  authDomain: "vxlibert.firebaseapp.com",
  projectId: "vxlibert",
  storageBucket: "vxlibert.firebasestorage.app",
  messagingSenderId: "491816836303",
  appId: "1:491816836303:web:af4398c3eee150b1672bba"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Inizializza il database Firestore

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

// Funzione per caricare i dati da Firestore
async function loadDataFromFirestore() {
  const docRef = db.collection("user_data").doc("notes");

  try {
    console.log("Caricamento dati da Firestore...");
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      const data = docSnap.data();
      console.log("Dati caricati:", data);
      populateUI(data);
    } else {
      console.log("Nessun dato trovato!");
    }
  } catch (error) {
    console.error("Errore nel caricamento dei dati da Firestore:", error);
  }
}

// Funzione per salvare i dati su Firestore
async function saveDataToFirestore(data) {
  const docRef = db.collection("user_data").doc("notes");

  try {
    await docRef.set(data);
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
