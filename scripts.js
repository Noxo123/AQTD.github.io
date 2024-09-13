document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupBtn = document.getElementById('show-signup-btn');
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');
    
    // Basculer entre les formulaires connexion et inscription
    showSignupBtn.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    // Bascule du thème sombre
    toggleThemeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    // Gestion du login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Votre code Firebase pour la connexion
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Redirection vers dashboard.html après connexion
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error('Erreur lors de la connexion', error);
            });
    });

    // Gestion de l'inscription
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        // Votre code Firebase pour l'inscription
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Redirection vers dashboard.html après inscription
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error('Erreur lors de l\'inscription', error);
            });
    });
});
