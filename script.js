// Definir cores alternadas para as notas
const noteColors = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb'];
let colorIndex = 0;


// Selecionar elementos do DOM
const addNoteButton = document.getElementById('add-note');
const noteTitleInput = document.getElementById('note-title');
const noteContentInput = document.getElementById('note-content');
const noteTagsInput = document.getElementById('note-tags');
const notesList = document.getElementById('notes-list');


// Carregar notas do localStorage quando o conteúdo do DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', loadNotes);


// Adicionar evento ao botão de adicionar nota
addNoteButton.addEventListener('click', addNote);


// Função para adicionar uma nova nota
function addNote() {
    const title = noteTitleInput.value; // Obter o valor do título da nota
    const content = noteContentInput.value; // Obter o valor do conteúdo da nota
    const tags = noteTagsInput.value.split(',').map(tag => tag.trim()); // Obter e formatar as tags


    if (title && content) { // Verificar se título e conteúdo não estão vazios
        const note = {
            id: Date.now(), // Gerar um ID único para a nota
            title,
            content,
            tags,
            color: getNextColor() // Definir a cor alternada para a nota
        };


        saveNoteToLocalStorage(note); // Salvar a nota no localStorage
        displayNote(note); // Exibir a nota na lista


        // Limpar os campos de entrada
        noteTitleInput.value = '';
        noteContentInput.value = '';
        noteTagsInput.value = '';
    }
}


// Função para obter a próxima cor alternada
function getNextColor() {
    const color = noteColors[colorIndex]; // Obter a cor atual
    colorIndex = (colorIndex + 1) % noteColors.length; // Atualizar o índice para a próxima cor
    return color; // Retornar a cor atual
}


// Função para exibir uma nota
function displayNote(note) {
    const noteItem = document.createElement('div'); // Criar um novo div para a nota
    noteItem.classList.add('note-item'); // Adicionar a classe 'note-item'
    noteItem.setAttribute('data-id', note.id); // Definir o atributo 'data-id' com o ID da nota
    noteItem.style.backgroundColor = note.color; // Definir a cor de fundo da nota


    // Definir o conteúdo HTML do div da nota
    noteItem.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="tags">${note.tags.map(tag => `#${tag}`).join(' ')}</div>
        <button onclick="deleteNote(${note.id})">Excluir</button>
    `;


    notesList.appendChild(noteItem); // Adicionar a nota à lista de notas
}


// Função para carregar notas do localStorage
function loadNotes() {
    const notes = getNotesFromLocalStorage(); // Obter as notas do localStorage
    notes.forEach(note => displayNote(note)); // Exibir cada nota
}


// Função para salvar uma nota no localStorage
function saveNoteToLocalStorage(note) {
    const notes = getNotesFromLocalStorage(); // Obter as notas existentes do localStorage
    notes.push(note); // Adicionar a nova nota à lista
    localStorage.setItem('notes', JSON.stringify(notes)); // Salvar a lista atualizada no localStorage
}


// Função para obter notas do localStorage
function getNotesFromLocalStorage() {
    return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []; // Retornar as notas ou uma lista vazia
}


// Função para excluir uma nota
function deleteNote(id) {
    let notes = getNotesFromLocalStorage(); // Obter as notas do localStorage
    notes = notes.filter(note => note.id !== id); // Filtrar a nota a ser excluída
    localStorage.setItem('notes', JSON.stringify(notes)); // Salvar a lista atualizada no localStorage
    document.querySelector(`[data-id="${id}"]`).remove(); // Remover a nota da lista exibida
}
