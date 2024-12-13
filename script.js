import { collection, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from './firebase.js';

// Funzione per navigare tra le app
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
window.navigateTo = navigateTo;

// Organizza le icone
function arrangeIcons() {
  const icons = document.querySelectorAll('.app-icon');
  const radius = 100;
  const angleStep = (2 * Math.PI) / icons.length;

  icons.forEach((icon, index) => {
    const angle = index * angleStep;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    icon.style.left = `calc(50% + ${x}px)`;
    icon.style.top = `calc(50% + ${y}px)`;
    icon.style.transform = `translate(-50%, -50%)`;
  });
}
document.addEventListener('DOMContentLoaded', arrangeIcons);

// Gestione del menu profilo
const profileButton = document.getElementById("profile-button");
const profileMenu = document.getElementById("profile-menu");

if (profileButton) {
  profileButton.addEventListener("click", () => {
    profileMenu.style.display = profileMenu.style.display === "none" ? "block" : "none";
  });

  document.addEventListener("click", (event) => {
    if (event.target !== profileButton && event.target !== profileMenu) {
      profileMenu.style.display = "none";
    }
  });
}
