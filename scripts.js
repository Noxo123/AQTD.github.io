// Variables globales
let agenda = [];
let shoppingList = [];

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

// Fonction pour ajouter un rendez-vous
function addAppointment() {
    const date = document.getElementById('date-input').value;
    const time = document.getElementById('time-input').value;
    const note = document.getElementById('note-input').value;
    const priority = document.getElementById('priority').value;

    if (date && time && note) {
        const appointment = { date, time, note, priority };
        agenda.push(appointment);
        saveAgenda();
        renderAgenda();
        clearAgendaInputs();
        sendNotification(date, time, note);
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

// Fonction pour envoyer une notification
function sendNotification(date, time, note) {
    if (Notification.permission === 'granted') {
        new Notification('Rendez-vous à venir', {
            body: `Le ${date} à ${time} - ${note}`,
            icon: 'icon.png' // Remplacez ceci par le chemin de votre icône
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                sendNotification(date, time, note);
            }
        });
    }
}

// Fonction pour ajouter un article de liste de courses
function addShoppingItem() {
    const item = document.getElementById('item-input').value;

    if (item) {
        shoppingList.push(item);
        saveShoppingList();
        renderShoppingList();
        clearShoppingInputs();
    } else {
        alert("Veuillez entrer un article.");
    }
}

// Fonction pour supprimer un rendez-vous de l'agenda
function deleteAppointment(index) {
    agenda.splice(index, 1);
    saveAgenda();
    renderAgenda();
}

// Fonction pour supprimer un article de la liste de courses
function deleteShoppingItem(index) {
    shoppingList.splice(index, 1);
    saveShoppingList();
    renderShoppingList();
}

// Fonction pour rendre la liste de l'agenda
function renderAgenda() {
    const list = document.getElementById('agenda-list');
    list.innerHTML = '';
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    agenda
        .filter(item => item.note.toLowerCase().includes(searchQuery))
        .forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.date} ${item.time} - ${item.note} (Priorité: ${item.priority})
                <span class="delete" onclick="deleteAppointment(${index})">&times;</span>
            `;
            list.appendChild(listItem);
        });
}

// Fonction pour rendre la liste de courses
function renderShoppingList() {
    const list = document.getElementById('shopping-list-items');
    list.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item}
            <span class="delete" onclick="deleteShoppingItem(${index})">&times;</span>
        `;
        list.appendChild(listItem);
    });
}

// Fonction pour sauvegarder l'agenda dans localStorage
function saveAgenda() {
    localStorage.setItem('agenda', JSON.stringify(agenda));
}

// Fonction pour sauvegarder la liste de courses dans localStorage
function saveShoppingList() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Fonction pour charger l'agenda depuis localStorage
function loadAgenda() {
    const storedAgenda = localStorage.getItem('agenda');
    if (storedAgenda) {
        agenda = JSON.parse(storedAgenda);
        renderAgenda();
    }
}

// Fonction pour charger la liste de courses depuis localStorage
function loadShoppingList() {
    const storedShoppingList = localStorage.getItem('shoppingList');
    if (storedShoppingList) {
        shoppingList = JSON.parse(storedShoppingList);
        renderShoppingList();
    }
}

// Fonction pour initialiser l'application
function init() {
    loadAgenda();
    loadShoppingList();
    document.getElementById('search-input').addEventListener('input', renderAgenda);
}

// Fonction pour basculer entre le mode sombre et clair
function toggleDarkMode() {
    document.body.classList.toggle('theme-dark');
    const icon = document.getElementById('theme-icon');
    icon.textContent = document.body.classList.contains('theme-dark') ? '🌙' : '🌞';
}

// Fonction pour partager l'agenda
function shareAgenda() {
    if (navigator.share) {
        navigator.share({
            title: 'Mon Agenda',
            text: 'Voici mon agenda.',
            url: window.location.href
        }).catch(console.error);
    } else {
        alert('Le partage n\'est pas supporté par ce navigateur.');
    }
}

// Fonction pour ajouter un bouton de widget à l'écran d'accueil
function addWidget() {
    if ('AddToHomeScreen' in window) {
        window.AddToHomeScreen();
    } else {
        alert('Le widget n\'est pas supporté par ce navigateur.');
    }
}

// Initialiser l'application
function init() {
    loadAgenda();
    loadShoppingList();
    document.getElementById('search-input').addEventListener('input', renderAgenda);
    showTab('agenda-tab'); // Affiche l'onglet Agenda par défaut
}
// Initialiser l'application
document.addEventListener('DOMContentLoaded', init);

// Gestion du bouton de changement de thème
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
