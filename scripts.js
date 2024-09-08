// scripts.js

// Variables globales
let agenda = {};
let shoppingList = {};
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
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = 'block';
    }
}

// Fonction pour basculer entre le mode sombre et clair
function toggleDarkMode() {
    document.body.classList.toggle('theme-dark');
    const icon = document.getElementById('theme-icon');
    icon.textContent = document.body.classList.contains('theme-dark') ? '🌙' : '🌞';
}

// Fonction pour charger l'agenda de l'utilisateur
function loadAgenda() {
    const userId = getUserId();
    const storedAgenda = localStorage.getItem(`agenda-${userId}`);
    if (storedAgenda) {
        agenda = JSON.parse(storedAgenda);
        renderAgenda();
    }
}

// Fonction pour sauvegarder les rendez-vous de l'utilisateur
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

// Fonction pour rendre l'agenda
function renderAgenda() {
    const agendaList = document.getElementById('agenda-list');
    agendaList.innerHTML = '';

    for (const [key, value] of Object.entries(agenda)) {
        const li = document.createElement('li');
        li.textContent = `${key} - ${value.note} (${value.priority})`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
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

// Fonction pour rendre la liste de courses
function renderShoppingList() {
    const shoppingListItems = document.getElementById('shopping-list-items');
    shoppingListItems.innerHTML = '';

    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.onclick = () => {
            shoppingList.splice(index, 1);
            saveShoppingList();
            renderShoppingList();
        };

        li.appendChild(deleteBtn);
        shoppingListItems.appendChild(li);
    });
}

// Fonction pour partager l'agenda
function shareAgenda() {
    const userId = getUserId();
    const agendaShareToken = generateShareToken();
    const expirationTime = Date.now() + shareDuration;
    localStorage.setItem(`agenda-share-${userId}`, JSON.stringify({ token: agendaShareToken, expires: expirationTime }));

    const shareLink = `${window.location.origin}?share=${agendaShareToken}`;
    alert(`Votre lien de partage est valable pour 1 heure : ${shareLink}`);
}

// Fonction pour générer un token de partage
function generateShareToken() {
    return Math.random().toString(36).substr(2, 10);
}

// Fonction pour vérifier l'expiration des liens de partage
function checkShareExpiration() {
    const userId = getUserId();
    const shareData = localStorage.getItem(`agenda-share-${userId}`);
    if (shareData) {
        const { expires } = JSON.parse(shareData);
        if (Date.now() > expires) {
            localStorage.removeItem(`agenda-share-${userId}`);
        }
    }
}

// Fonction pour charger et afficher un agenda partagé
function loadSharedAgenda() {
    const urlParams = new URLSearchParams(window.location.search);
    const shareToken = urlParams.get('share');

    if (shareToken) {
        const userId = getUserId();
        const shareData = localStorage.getItem(`agenda-share-${userId}`);

        if (shareData) {
            const { token, expires } = JSON.parse(shareData);

            if (token === shareToken && Date.now() <= expires) {
                const sharedAgenda = localStorage.getItem(`agenda-${userId}`);
                if (sharedAgenda) {
                    agenda = JSON.parse(sharedAgenda);
                    renderAgenda();
                }
            } else {
                alert('Le lien de partage a expiré ou est invalide.');
            }
        }
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    displayUserId();
    loadAgenda();
    loadShoppingList();
    loadSharedAgenda();
    document.getElementById('search-input').addEventListener('input', renderAgenda);
    showTab('agenda-tab'); // Affiche l'onglet Agenda par défaut
});

// Gestion du bouton de changement de thème
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
