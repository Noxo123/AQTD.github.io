import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyCZ4T5QxdqK6pDqWuGecnt4X-CZpT3DaOQ",
    authDomain: "aqtd-5f6ed.firebaseapp.com",
    projectId: "aqtd-5f6ed",
    storageBucket: "aqtd-5f6ed.appspot.com",
    messagingSenderId: "755816540323",
    appId: "1:755816540323:web:e85774039b471fee7cf716",
    measurementId: "G-C59QS88D6Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, redirect to dashboard
            window.location.href = 'dashboard.html';
        }
    });
});

document.getElementById('auth-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const authTitle = document.getElementById('auth-title').textContent;

    if (authTitle === 'Login') {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            })
            .catch(error => alert('Error: ' + error.message));
    } else {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            })
            .catch(error => alert('Error: ' + error.message));
    }
});

document.getElementById('toggle-auth').addEventListener('click', () => {
    const authTitle = document.getElementById('auth-title');
    if (authTitle.textContent === 'Login') {
        authTitle.textContent = 'Sign Up';
        document.getElementById('auth-btn').textContent = 'Sign Up';
        document.getElementById('switch-auth').textContent = 'Already have an account?';
    } else {
        authTitle.textContent = 'Login';
        document.getElementById('auth-btn').textContent = 'Sign In';
        document.getElementById('switch-auth').textContent = 'Don\'t have an account?';
    }
});
