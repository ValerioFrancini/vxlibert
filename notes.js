import { collection, doc, getDocs, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  let noteIdToDelete = null;

  // Funzione per salvare una nota
  async function saveNote() {
    const noteInput = document.getElementById("note-input");
    const note = noteInput?.value || "";

    if (!note.trim()) {
      alert("La nota non può essere vuota!");
      return;
    }

    const data = {
      note: note,
      timestamp: new Date().toISOString(),
    };

    try {
      const noteId = `note_${Date.now()}`;
      const docRef = doc(collection(db, "user_data", "notes", "all_notes"), noteId);
      await setDoc(docRef, data);

      alert("Nota salvata!");
      noteInput.value = ""; // Resetta il campo input
      loadNotes(); // Aggiorna l'elenco delle note
    } catch (error) {
      console.error("Errore nel salvataggio della nota:", error);
    }
  }

  // Funzione per caricare le note
  async function loadNotes() {
    const notesContainer = document.getElementById("notes-container");
    if (!notesContainer) {
      console.error("Contenitore delle note non trovato.");
      return;
    }

    notesContainer.innerHTML = ""; // Pulisci il contenitore prima di caricare nuove note

    try {
      const querySnapshot = await getDocs(collection(db, "user_data", "notes", "all_notes"));
      if (querySnapshot.empty) {
        console.log("Nessuna nota trovata.");
        notesContainer.innerHTML = "<p>Nessuna nota disponibile.</p>";
        return;
      }

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

  // Funzione per mostrare il modale di eliminazione
  function showDeleteModal(noteId) {
    noteIdToDelete = noteId;
    const modal = document.getElementById("delete-modal");
    if (modal) {
      modal.style.display = "flex";
    } else {
      console.error("Modale di eliminazione non trovato.");
    }
  }

  // Funzione per nascondere il modale di eliminazione
  function hideDeleteModal() {
    const modal = document.getElementById("delete-modal");
    if (modal) {
      modal.style.display = "none";
    }
    noteIdToDelete = null;
  }

  // Funzione per confermare ed eliminare una nota
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

  // Aggiungi i listener agli eventi del modale
  const confirmDeleteButton = document.getElementById("confirm-delete");
  const cancelDeleteButton = document.getElementById("cancel-delete");

  if (confirmDeleteButton) {
    confirmDeleteButton.addEventListener("click", confirmDelete);
  } else {
    console.error("Bottone di conferma eliminazione non trovato.");
  }

  if (cancelDeleteButton) {
    cancelDeleteButton.addEventListener("click", hideDeleteModal);
  } else {
    console.error("Bottone di annullamento eliminazione non trovato.");
  }

  // Listener per salvare la nota
  const saveNoteButton = document.getElementById("save-note");
  if (saveNoteButton) {
    saveNoteButton.addEventListener("click", saveNote);
  } else {
    console.error("Bottone Salva Nota non trovato.");
  }

  // Carica le note all'avvio
  loadNotes();
});
