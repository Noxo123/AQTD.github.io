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

// Initialiser Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Fonction pour gérer le login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Authentification avec Firebase
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Si connexion réussie, rediriger vers le dashboard
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            // Gérer les erreurs de connexion
            const errorMessage = error.message;
            document.getElementById('error-message').textContent = errorMessage;
        });
});
