// Importa i moduli Firestore necessari
import { collection, doc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from './firebase.js'; // Assicurati che il percorso sia corretto

// Funzione per salvare una nuova nota
async function saveNote() {
  const note = document.getElementById("note-input").value;

  if (!note.trim()) {
    alert("La nota non può essere vuota!");
    return;
  }

  const data = {
    note: note,
    timestamp: new Date().toISOString()
  };

  try {
    // Genera un ID unico per ogni nota
    const noteId = `note_${Date.now()}`;
    const docRef = doc(collection(db, "user_data", "notes", "all_notes"), noteId);
    await setDoc(docRef, data);

    console.log("Nota salvata con successo!");
    alert("Nota salvata!");
    document.getElementById("note-input").value = ""; // Resetta il campo
    loadNotes(); // Ricarica l'archivio delle note
  } catch (error) {
    console.error("Errore nel salvataggio della nota:", error);
  }
}

// Funzione per caricare tutte le note dall'archivio
async function loadNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = ""; // Pulisce l'archivio prima di caricare

  try {
    const querySnapshot = await getDocs(collection(db, "user_data", "notes", "all_notes"));
    querySnapshot.forEach((doc) => {
      const noteData = doc.data();
      const listItem = document.createElement("li");
      listItem.textContent = `${noteData.note} (salvata il ${new Date(noteData.timestamp).toLocaleString()})`;
      notesList.appendChild(listItem);
    });
    console.log("Archivio note caricato!");
  } catch (error) {
    console.error("Errore nel caricamento dell'archivio note:", error);
  }
}

// Carica le note quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadNotes);

// Rendi le funzioni disponibili globalmente
window.saveNote = saveNote;
