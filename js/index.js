
// creation des const differentes
const search = document.querySelector("#note-form");
const noteListe = document.querySelector("#liste");
const searchInput = document.querySelector("input");
const tacheNombre = document.querySelector("#tache-nombre");
// Declaration de counteur
let nombreOfTaches = 0;
// Telechargement des notes de localStorage si il y a
let notes = JSON.parse(localStorage.getItem('notes')) || []; 
// Mise en jour de nombre des taches
const updateTaskCount = () => {
    tacheNombre.innerHTML = `(${nombreOfTaches})`;
};
// Sauvgarde des notes en localStorage en format JSON
const saveToLocalStorage = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
};
// Affichage des notes
const renderNotes = () => {
    noteListe.innerHTML = '';
    notes.forEach(note => {
        const newNote = document.createElement('div');
        newNote.className = 'note';
        newNote.innerHTML = `<p>${note.text}</p><hr>`;
        if (note.done) {
            newNote.querySelector('p').style.textDecoration = 'line-through';
        }
        noteListe.appendChild(newNote);
    });
    nombreOfTaches = notes.length;
    updateTaskCount();
};

// EL d'envois
search.addEventListener('submit', (e) => {
    e.preventDefault();
    // Si le champe de saisi est vide ça va afficher l'alert
    const noteText = searchInput.value.trim();
    if (noteText.length === 0) {
        alert("Le champ est vide");
        return;
    }
    // Crée une nouvelle note et l'ajoute au tableau "notes"
    const newNote = { text: noteText, done: false };
    notes.push(newNote);
    saveToLocalStorage(); // Sauvegarde les notes mises à jour dans le localStorage

    renderNotes(); // Reaffiche la liste des notes
    searchInput.value = ''; // Reinitialise le champ de saisie
});

// Gestionnaire d'événements pour cliquer sur une note
noteListe.addEventListener('click', (e) => {
    const noteElement = e.target.closest('.note');
    if (!noteElement) return;

    const noteIndex = Array.from(noteListe.children).indexOf(noteElement); // Trouve l'index de la note cliquée
    if (noteIndex === -1) return;
    // Si la note n'est pas terminée, elle est marquée comme terminée
    if (!notes[noteIndex].done) {
        notes[noteIndex].done = true;
    } else {
        notes.splice(noteIndex, 1); 
    }

    saveToLocalStorage();
    renderNotes();
});
// Evenement declenché au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    renderNotes();
});

console.log('index.js loaded');
