// Importa le librerie necessarie da Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// Listener per il menu del profilo
const profileButton = document.getElementById("profile-button");
const profileMenu = document.getElementById("profile-menu");

if (profileButton) {
  profileButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Evita conflitti con altri eventi
    profileMenu.style.display = profileMenu.style.display === "none" ? "block" : "none";
  });

  // Nascondi il menu cliccando fuori
  document.addEventListener("click", (event) => {
    if (event.target !== profileButton && event.target !== profileMenu) {
      profileMenu.style.display = "none";
    }
  });
}

// Gestione dei pulsanti di login
document.getElementById("login-button").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const errorMessage = document.getElementById("login-error-message");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    errorMessage.textContent = "";
  } catch (error) {
    errorMessage.textContent = `Errore: ${error.message}`;
  }
});

// Gestione dei pulsanti di registrazione
document.getElementById("register-button").addEventListener("click", async () => {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const errorMessage = document.getElementById("register-error-message");

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registrazione completata! Ora puoi accedere.");
    document.querySelector(".register-box").style.display = "none";
    document.querySelector(".login-box").style.display = "block";
    errorMessage.textContent = "";
  } catch (error) {
    errorMessage.textContent = `Errore: ${error.message}`;
  }
});

// Logout
document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    await signOut(auth);
    document.getElementById("main-content").style.display = "none";
    document.getElementById("login-screen").style.display = "block";
  } catch (error) {
    console.error("Errore durante il logout:", error.message);
  }
});

// Monitoraggio dello stato di autenticazione
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("main-content").style.display = "block";
    document.getElementById("login-screen").style.display = "none";
  } else {
    document.getElementById("login-screen").style.display = "block";
    document.getElementById("main-content").style.display = "none";
  }
});
