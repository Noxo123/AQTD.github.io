// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
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
    // Check if elements exist before adding event listeners
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutButton = document.getElementById('logout-button');
    const themeToggle = document.getElementById('theme-toggle');
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('Utilisateur connecté:', userCredential.user);
                    showDashboard();
                })
                .catch((error) => {
                    console.error('Erreur de connexion:', error);
                });
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('Utilisateur créé:', userCredential.user);
                })
                .catch((error) => {
                    console.error('Erreur lors de l\'inscription:', error);
                });
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).then(() => {
                console.log('Utilisateur déconnecté');
                showAuthSection();
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
            showDashboard();
            loadUserData(user.uid);
        } else {
            showAuthSection();
        }
    });

    // Toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('theme-dark');
        themeToggle.textContent = document.body.classList.contains('theme-dark') ? '🌙 Mode Clair' : '🌞 Mode Sombre';
    }

    // Show dashboard
    function showDashboard() {
        if (authSection) authSection.style.display = 'none';
        if (dashboardSection) dashboardSection.style.display = 'block';
    }

    // Show authentication section
    function showAuthSection() {
        if (authSection) authSection.style.display = 'block';
        if (dashboardSection) dashboardSection.style.display = 'none';
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
        const agendaList = document.getElementById('agenda-list');
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
        const shoppingListElement = document.getElementById('shopping-list');
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
