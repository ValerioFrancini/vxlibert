import { collection, doc, getDocs, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from './firebase.js';

let noteIdToDelete = null;

document.addEventListener('DOMContentLoaded', () => {
  // Salva una nota
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
      const noteId = `note_${Date.now()}`;
      const docRef = doc(collection(db, "user_data", "notes", "all_notes"), noteId);
      await setDoc(docRef, data);

      alert("Nota salvata!");
      document.getElementById("note-input").value = "";
      loadNotes();
    } catch (error) {
      console.error("Errore nel salvataggio della nota:", error);
    }
  }

  // Carica le note
  async function loadNotes() {
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";

    try {
      const querySnapshot = await getDocs(collection(db, "user_data", "notes", "all_notes"));
      querySnapshot.forEach((doc) => {
        const noteData = doc.data();
        const noteId = doc.id;
        const card = createNoteCard(noteId, noteData.note, noteData.timestamp);
        notesContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Errore nel caricamento delle note:", error);
    }
  }

  // Crea una card per una nota
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

  // Modale di eliminazione
  function showDeleteModal(noteId) {
    noteIdToDelete = noteId;
    const modal = document.getElementById("delete-modal");
    modal.style.display = "flex";
  }

  function hideDeleteModal() {
    const modal = document.getElementById("delete-modal");
    modal.style.display = "none";
    noteIdToDelete = null;
  }

  async function confirmDelete() {
    if (!noteIdToDelete) return;

    try {
      const docRef = doc(collection(db, "user_data", "notes", "all_notes"), noteIdToDelete);
      await deleteDoc(docRef);

      alert("Nota eliminata!");
      hideDeleteModal();
      loadNotes();
    } catch (error) {
      console.error("Errore nell'eliminazione della nota:", error);
    }
  }

  // Eventi per il modale
  document.getElementById("confirm-delete").addEventListener("click", confirmDelete);
  document.getElementById("cancel-delete").addEventListener("click", hideDeleteModal);

  // Carica le note
  loadNotes();

  // Rendi globali alcune funzioni
  window.saveNote = saveNote;
});
