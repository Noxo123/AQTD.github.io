// dashboard.js

// Import Firebase modules
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ4T5QxdqK6pDqWuGecnt4X-CZpT3DaOQ",
  authDomain: "aqtd-5f6ed.firebaseapp.com",
  projectId: "aqtd-5f6ed",
  storageBucket: "aqtd-5f6ed.appspot.com",
  messagingSenderId: "755816540323",
  appId: "1:755816540323:web:e85774039b471fee7cf716",
  measurementId: "G-C59QS88D6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Load when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const logoutButton = document.getElementById('logout-button');
    const themeToggle = document.getElementById('theme-toggle');
    const agendaList = document.getElementById('agenda-list');
    const shoppingListElement = document.getElementById('shopping-list');

    // Check if elements exist before adding event listeners
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).then(() => {
                console.log('Utilisateur déconnecté');
                window.location.href = 'index.html';
            }).catch((error) => {
                console.error('Erreur de déconnexion:', error);
            });
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }

    // Authentication state observer
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadUserData(user.uid);
        } else {
            window.location.href = 'index.html';
        }
    });

    // Toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('theme-dark');
        themeToggle.textContent = document.body.classList.contains('theme-dark') ? '🌙 Mode Clair' : '🌞 Mode Sombre';
    }

    // Load user data (agenda and shopping list)
    function loadUserData(userId) {
        const agendaRef = ref(db, 'agenda/' + userId);
        const shoppingListRef = ref(db, 'shoppingList/' + userId);

        // Load agenda
        get(agendaRef).then((snapshot) => {
            if (snapshot.exists()) {
                const agenda = snapshot.val();
                renderAgenda(agenda);
            } else {
                console.log('Aucun agenda trouvé.');
            }
        }).catch((error) => {
            console.error('Erreur lors du chargement de l\'agenda:', error);
        });

        // Load shopping list
        get(shoppingListRef).then((snapshot) => {
            if (snapshot.exists()) {
                const shoppingList = snapshot.val();
                renderShoppingList(shoppingList);
            } else {
                console.log('Aucune liste de courses trouvée.');
            }
        }).catch((error) => {
            console.error('Erreur lors du chargement de la liste de courses:', error);
        });
    }

    // Render agenda
    function renderAgenda(agenda) {
        if (agendaList) {
            agendaList.innerHTML = '';
            Object.entries(agenda).forEach(([date, entry]) => {
                const li = document.createElement('li');
                li.textContent = `${date}: ${entry.note} (Priorité: ${entry.priority})`;
                agendaList.appendChild(li);
            });
        }
    }

    // Render shopping list
    function renderShoppingList(shoppingList) {
        if (shoppingListElement) {
            shoppingListElement.innerHTML = '';
            shoppingList.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                shoppingListElement.appendChild(li);
            });
        }
    }
});
