// Importa i moduli Firestore necessari
import { collection, doc, getDocs, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from './firebase.js'; // Assicurati che il percorso sia corretto

let noteIdToDelete = null; // Variabile per salvare l'ID della nota da eliminare

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
  const notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = ""; // Pulisce l'archivio prima di caricare

  try {
    const querySnapshot = await getDocs(collection(db, "user_data", "notes", "all_notes"));
    querySnapshot.forEach((doc) => {
      const noteData = doc.data();
      const noteId = doc.id;
      const card = createNoteCard(noteId, noteData.note, noteData.timestamp);
      notesContainer.appendChild(card);
    });
    console.log("Archivio note caricato!");
  } catch (error) {
    console.error("Errore nel caricamento dell'archivio note:", error);
  }
}

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
  deleteButton.onclick = () => showDeleteModal(noteId);

  card.appendChild(noteText);
  card.appendChild(noteDate);
  card.appendChild(deleteButton);

  return card;
}

// Funzione per mostrare il modale di eliminazione
function showDeleteModal(noteId) {
  noteIdToDelete = noteId; // Salva l'ID della nota
  const modal = document.getElementById("delete-modal");
  modal.style.display = "flex"; // Mostra il modale
}

// Funzione per nascondere il modale
function hideDeleteModal() {
  const modal = document.getElementById("delete-modal");
  modal.style.display = "none"; // Nascondi il modale
  noteIdToDelete = null; // Resetta l'ID della nota
}

// Funzione per eliminare la nota
async function confirmDelete() {
  if (!noteIdToDelete) return;

  try {
    const docRef = doc(collection(db, "user_data", "notes", "all_notes"), noteIdToDelete);
    await deleteDoc(docRef);
    console.log("Nota eliminata con successo!");
    alert("Nota eliminata!");
    hideDeleteModal(); // Nascondi il modale
    loadNotes(); // Aggiorna l'elenco delle note
  } catch (error) {
    console.error("Errore nell'eliminazione della nota:", error);
  }
}

// Aggiungi eventi ai pulsanti del modale
document.getElementById("confirm-delete").addEventListener("click", confirmDelete);
document.getElementById("cancel-delete").addEventListener("click", hideDeleteModal);

// Carica le note quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadNotes);

// Rendi le funzioni disponibili globalmente
window.saveNote = saveNote;
