// Importa le librerie necessarie da Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

// Inizializza Firestore e Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Esporta `db` e `auth` per usarli in altri file
export { db, auth };

// **Gestione degli elementi del DOM**
document.addEventListener("DOMContentLoaded", () => {
  // **Menu Profilo**
  const profileButton = document.getElementById("profile-button");
  const profileMenu = document.getElementById("profile-menu");

  if (profileButton && profileMenu) {
    profileButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Evita conflitti con altri eventi
      profileMenu.style.display = profileMenu.style.display === "none" ? "block" : "none";
    });

    document.addEventListener("click", (event) => {
      if (!profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
        profileMenu.style.display = "none";
      }
    });
  } else {
    console.warn("Profilo o menu profilo non trovato! Controlla il tuo HTML.");
  }

  // **Login**
  const loginButton = document.getElementById("login-button");
  const registerButton = document.getElementById("register-button");
  const logoutButton = document.getElementById("logout-button");

  if (loginButton) {
    loginButton.addEventListener("click", async () => {
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      const errorMessage = document.getElementById("login-error-message");

      try {
        await signInWithEmailAndPassword(auth, email, password);
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        if (errorMessage) errorMessage.textContent = "";
      } catch (error) {
        if (errorMessage) errorMessage.textContent = `Errore: ${error.message}`;
      }
    });
  } else {
    console.warn("Bottone di login non trovato! Controlla il tuo HTML.");
  }

  // **Registrazione**
  if (registerButton) {
    registerButton.addEventListener("click", async () => {
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      const errorMessage = document.getElementById("register-error-message");

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registrazione completata! Ora puoi accedere.");
        document.querySelector(".register-box").style.display = "none";
        document.querySelector(".login-box").style.display = "block";
        if (errorMessage) errorMessage.textContent = "";
      } catch (error) {
        if (errorMessage) errorMessage.textContent = `Errore: ${error.message}`;
      }
    });
  } else {
    console.warn("Bottone di registrazione non trovato! Controlla il tuo HTML.");
  }

  // **Logout**
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await signOut(auth);
        document.getElementById("main-content").style.display = "none";
        document.getElementById("login-screen").style.display = "block";
      } catch (error) {
        console.error("Errore durante il logout:", error.message);
      }
    });
  } else {
    console.warn("Bottone di logout non trovato! Controlla il tuo HTML.");
  }

  // **Monitoraggio dello stato di autenticazione**
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById("main-content").style.display = "block";
      document.getElementById("login-screen").style.display = "none";
    } else {
      document.getElementById("login-screen").style.display = "block";
      document.getElementById("main-content").style.display = "none";
    }
  });
});
