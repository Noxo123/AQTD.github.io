// Variables globales
let agenda = {};
let shoppingList = [];
const shareDuration = 60 * 60 * 1000; // 1 heure en millisecondes

// Fonction pour générer un ID utilisateur unique
function generateUserId() {
    return 'user-' + Math.random().toString(36).substr(2, 9);
}

// Fonction pour récupérer ou créer un ID utilisateur
function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem('userId', userId);
    }
    return userId;
}

// Fonction pour afficher l'ID utilisateur
function displayUserId() {
    const userIdDisplay = document.getElementById('user-id-display');
    userIdDisplay.textContent = `ID Utilisateur: ${getUserId()}`;
}

// Fonction pour afficher les onglets
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

// Fonction pour basculer entre le mode sombre et clair
function toggleDarkMode() {
    document.body.classList.toggle('theme-dark');
    const icon = document.getElementById('theme-icon');
    icon.textContent = document.body.classList.contains('theme-dark') ? '🌙' : '🌞';
}

// Fonction pour charger l'agenda
function loadAgenda() {
    const userId = getUserId();
    const storedAgenda = localStorage.getItem(`agenda-${userId}`);
    if (storedAgenda) {
        agenda = JSON.parse(storedAgenda);
        renderAgenda();
    }
}

// Fonction pour sauvegarder l'agenda
function saveAgenda() {
    const userId = getUserId();
    localStorage.setItem(`agenda-${userId}`, JSON.stringify(agenda));
}

// Fonction pour ajouter un rendez-vous
function addAppointment() {
    const date = document.getElementById('date-input').value;
    const time = document.getElementById('time-input').value;
    const note = document.getElementById('note-input').value;
    const priority = document.getElementById('priority').value;

    if (date && time && note) {
        const key = `${date} ${time}`;
        agenda[key] = { note, priority };
        saveAgenda();
        renderAgenda();
    }
}

// Fonction pour afficher l'agenda
function renderAgenda() {
    const agendaList = document.getElementById('agenda-list');
    agendaList.innerHTML = '';

    for (const [key, value] of Object.entries(agenda)) {
        const li = document.createElement('li');
        li.textContent = `${key} - ${value.note} (${value.priority})`;

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete');
        deleteBtn.onclick = () => {
            delete agenda[key];
            saveAgenda();
            renderAgenda();
        };

        li.appendChild(deleteBtn);
        agendaList.appendChild(li);
    }
}

// Fonction pour ajouter un article à la liste de courses
function addShoppingItem() {
    const item = document.getElementById('item-input').value;
    if (item) {
        shoppingList.push(item);
        saveShoppingList();
        renderShoppingList();
    }
}

// Fonction pour sauvegarder la liste de courses
function saveShoppingList() {
    const userId = getUserId();
    localStorage.setItem(`shoppingList-${userId}`, JSON.stringify(shoppingList));
}

// Fonction pour charger la liste de courses
function loadShoppingList() {
    const userId = getUserId();
    const storedShoppingList = localStorage.getItem(`shoppingList-${userId}`);
    if (storedShoppingList) {
        shoppingList = JSON.parse(storedShoppingList);
        renderShoppingList();
    }
}

// Fonction pour afficher la liste de courses
function renderShoppingList() {
    const list = document.getElementById('shopping-list-items');
    list.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete');
        deleteBtn.onclick = () => {
            shoppingList.splice(index, 1);
            saveShoppingList();
            renderShoppingList();
        };

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Fonction pour partager l'agenda (lecture seule)
function shareAgenda() {
    const userId = getUserId();
    localStorage.setItem(`shared-agenda-${userId}`, JSON.stringify(agenda));

    setTimeout(() => {
        localStorage.removeItem(`shared-agenda-${userId}`);
    }, shareDuration);

    alert('Agenda partagé pour une heure');
}

// Initialisation
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
window.onload = () => {
    displayUserId();
    loadAgenda();
    loadShoppingList();
};
