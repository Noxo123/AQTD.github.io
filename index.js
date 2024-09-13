// index.js

// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';

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

// Load when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const themeToggle = document.getElementById('theme-toggle');

    // Check if elements exist before adding event listeners
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('Utilisateur connecté:', userCredential.user);
                    window.location.href = 'dashboard.html';
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

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }

    // Toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('theme-dark');
        themeToggle.textContent = document.body.classList.contains('theme-dark') ? '🌙 Mode Clair' : '🌞 Mode Sombre';
    }
});
