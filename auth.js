import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';

// Signup function
async function signUp(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up');
    } catch (error) {
        console.error('Signup error:', error);
    }
}

// Login function
async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in');
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    } catch (error) {
        console.error('Login error:', error);
    }
}

// Logout function
function logout() {
    signOut(auth).then(() => {
        console.log('User logged out');
        window.location.href = 'index.html'; // Redirect to login
    }).catch((error) => {
        console.error('Logout error:', error);
    });
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is logged in');
    } else {
        console.log('User is not logged in');
    }
});

export { signUp, login, logout };
