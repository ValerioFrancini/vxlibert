import { collection, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  // Funzione per navigare tra le app
  function navigateTo(app) {
    console.log(`Navigazione verso ${app}`);
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
        console.error(`Navigazione non valida: ${app}`);
        window.location.href = `${app}.html`;
    }
  }
  
  // Rende la funzione di navigazione globale
  window.navigator = navigateTo;

  // Organizza le icone in cerchio
  function arrangeIcons() {
    const icons = document.querySelectorAll('.app-icon');
    if (icons.length === 0) {
      console.warn("Nessuna icona trovata per l'organizzazione.");
      return;
    }

    const radius = 100; // Raggio del cerchio
    const angleStep = (2 * Math.PI) / icons.length; // Passo angolare

    icons.forEach((icon, index) => {
      const angle = index * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      // Imposta la posizione
      icon.style.left = `calc(50% + ${x}px)`;
      icon.style.top = `calc(50% + ${y}px)`;
      icon.style.transform = `translate(-50%, -50%)`;
    });
  }

  arrangeIcons();

  // Gestione del menu profilo
  const profileButton = document.getElementById('profile-button');
  const profileMenu = document.getElementById('profile-menu');

  // Controlla che entrambi gli elementi esistano
  if (profileButton && profileMenu) {
    // Aggiungi un evento al clic sul pulsante del profilo
    profileButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Previeni la propagazione del clic
      const isMenuVisible = profileMenu.style.display === 'block';
      profileMenu.style.display = isMenuVisible ? 'none' : 'block'; // Mostra o nascondi il menu
    });

    // Nascondi il menu cliccando fuori
    document.addEventListener('click', () => {
      profileMenu.style.display = 'none';
    });

    // Impedisci che il clic sul menu lo chiuda
    profileMenu.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  } else {
    console.error('Pulsante del profilo o menu non trovato!');
  }
});

  // Aggiungi listener per i pulsanti delle app
  const appIcons = document.querySelectorAll('.app-icon');
  if (appIcons.length === 0) {
    console.warn("Nessuna icona trovata per l'aggiunta di listener.");
  } else {
    appIcons.forEach((icon) => {
      icon.addEventListener('click', () => {
        const app = icon.id.split('-')[0]; // Estrae il nome dell'app dall'ID
        navigateTo(app);
      });
    });
  }

  // Verifica configurazione Firebase
  if (!db) {
    console.error("Firebase non è stato inizializzato correttamente. Controlla la configurazione del file firebase.js.");
    return;
  }

  console.log("Script caricato correttamente.");

// Funzione per creare una card per una nota
function createNoteCard(noteId, note, timestamp) {
    const card = document.createElement("div");
    card.classList.add("note-card");
  
    const noteText = document.createElement("p");
    noteText.textContent = note;
  
    const noteDate = document.createElement("span");
    noteDate.textContent = `Salvata il ${new Date(timestamp).toLocaleString()}`;
    noteDate.classList.add("note-date");
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Elimina";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => showDeleteModal(noteId));
  
    card.appendChild(noteText);
    card.appendChild(noteDate);
    card.appendChild(deleteButton);
  
    return card;
  }
  