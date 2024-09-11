// scripts/profile.js

document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settingsForm');

    settingsForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Appel à l'API ou traitement des données
            await updateUserProfile(username, password);
            alert('Les modifications ont été enregistrées avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            alert('Une erreur est survenue lors de l\'enregistrement.');
        }
    });
});

async function updateUserProfile(username, password) {
    // Exemple de code pour mettre à jour le profil utilisateur
    // Remplacez par votre logique pour interagir avec une API ou une base de données

    const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Échec de la mise à jour du profil');
    }

    return response.json();
}

// scripts/profile.js

import { getAuth, updateProfile, updatePassword } from 'firebase/auth';

const auth = getAuth();

document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settingsForm');

    settingsForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const user = auth.currentUser;
            if (user) {
                // Mise à jour du pseudo
                await updateProfile(user, { displayName: username });
                
                // Mise à jour du mot de passe
                await updatePassword(user, password);

                alert('Les modifications ont été enregistrées avec succès !');
            } else {
                alert('Utilisateur non connecté.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            alert('Une erreur est survenue lors de l\'enregistrement.');
        }
    });
});
