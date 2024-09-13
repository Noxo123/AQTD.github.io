// Import unique de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCZ4T5QxdqK6pDqWuGecnt4X-CZpT3DaOQ",
    authDomain: "aqtd-5f6ed.firebaseapp.com",
    projectId: "aqtd-5f6ed",
    storageBucket: "aqtd-5f6ed.appspot.com",
    messagingSenderId: "755816540323",
    appId: "1:755816540323:web:e85774039b471fee7cf716",
    measurementId: "G-C59QS88D6Y"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Connexion utilisateur
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error('Erreur de connexion', error);
        });
});

// Inscription utilisateur
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error('Erreur lors de l\'inscription', error);
        });
});

// Déconnexion utilisateur
document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error('Erreur lors de la déconnexion', error);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Vérification et ajout de l'écouteur sur le formulaire de connexion
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    window.location.href = "dashboard.html";
                })
                .catch((error) => {
                    console.error('Erreur de connexion', error);
                });
        });
    } else {
        console.error('Formulaire de connexion non trouvé');
    }

    // Vérification et ajout de l'écouteur sur le formulaire d'inscription
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    window.location.href = "dashboard.html";
                })
                .catch((error) => {
                    console.error('Erreur lors de l\'inscription', error);
                });
        });
    }

    // Vérification et ajout de l'écouteur sur le bouton de déconnexion
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth).then(() => {
                window.location.href = "index.html";
            }).catch((error) => {
                console.error('Erreur lors de la déconnexion', error);
            });
        });
    }
});
