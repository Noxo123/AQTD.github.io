// Variables globales
let agenda = {};
let shoppingList = [];
const shareDuration = 60 * 60 * 1000; // 1 heure en millisecondes
const notificationInterval = 60 * 1000; // Vérification toutes les minutes

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

    // Gérer les boutons d'onglets actifs
    const tabButtons = document.querySelectorAll('.tabs button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    const activeButton = document.querySelector(`.tabs button[onclick="showTab('${tabId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
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

// Fonction pour rendre l'agenda avec les priorités en couleur
function renderAgenda() {
    const agendaList = document.getElementById('agenda-list');
    agendaList.innerHTML = '';

    const searchInput = document.getElementById('search-input').value.toLowerCase();

    for (const [key, value] of Object.entries(agenda)) {
        if (key.toLowerCase().includes(searchInput) || value.note.toLowerCase().includes(searchInput)) {
            const li = document.createElement('li');
            li.textContent = `${key} - ${value.note} (${value.priority})`;

            // Ajoutez une couleur en fonction de la priorité
            if (value.priority === 'Faible') {
                li.style.backgroundColor = '#b3e5fc'; // Bleu clair
            } else if (value.priority === 'Moyenne') {
                li.style.backgroundColor = '#fff59d'; // Jaune clair
            } else if (value.priority === 'Élevée') {
                li.style.backgroundColor = '#ffccbc'; // Orange clair
            }

            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = '❌';
            deleteBtn.className = 'delete';
            deleteBtn.onclick = () => {
                delete agenda[key];
                saveAgenda();
                renderAgenda();
            };

            li.appendChild(deleteBtn);
            agendaList.appendChild(li);
        }
    }
}

// Fonction pour envoyer des notifications de rappel
function sendNotification(message) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Fonction pour vérifier les rendez-vous à venir
function checkUpcomingAppointments() {
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    for (const key of Object.keys(agenda)) {
        const appointmentDate = new Date(key);
        if (appointmentDate > now && appointmentDate <= next24Hours) {
            sendNotification(`Rappel: Vous avez un rendez-vous à venir le ${key}.`);
        }
    }
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

// Fonction initiale
document.addEventListener('DOMContentLoaded', () => {
    displayUserId();
    loadAgenda();
    loadSharedAgenda();
    document.getElementById('search-input').addEventListener('input', renderAgenda);
    showTab('agenda-tab'); // Affiche l'onglet Agenda par défaut

    setInterval(checkUpcomingAppointments, notificationInterval); // Vérification des rendez-vous toutes les minutes
});

// Gestion du bouton de changement de thème
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
