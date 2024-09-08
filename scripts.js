document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour afficher l'onglet sélectionné
    window.showTab = function (tabId) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    };

    // Fonction pour ajouter un rendez-vous dans l'agenda
    window.saveAgenda = function () {
        const dateInput = document.getElementById('agenda-date').value;
        const noteText = document.getElementById('agenda-note').value.trim();

        if (!dateInput || !noteText) {
            alert("Veuillez entrer une date et un rendez-vous.");
            return;
        }

        const agendas = JSON.parse(localStorage.getItem('agendas')) || {};
        if (!agendas[dateInput]) {
            agendas[dateInput] = [];
        }

        agendas[dateInput].push(noteText);
        localStorage.setItem('agendas', JSON.stringify(agendas));

        loadAgenda();
        document.getElementById('agenda-date').value = '';
        document.getElementById('agenda-note').value = '';
    };

    // Fonction pour charger les rendez-vous depuis le localStorage
    function loadAgenda() {
        const agendas = JSON.parse(localStorage.getItem('agendas')) || {};
        const agendaContainer = document.getElementById('agenda-container');
        agendaContainer.innerHTML = ''; // Efface les anciens rendez-vous

        Object.keys(agendas).forEach(date => {
            const dateElement = document.createElement('div');
            dateElement.classList.add('agenda-date');
            dateElement.innerHTML = `<strong>${date}</strong>`;

            const agendaList = document.createElement('ul');
            agendas[date].forEach((note, index) => {
                const agendaItem = document.createElement('li');
                agendaItem.classList.add('agenda-item');
                agendaItem.innerHTML = `${note} 
                    <button onclick="deleteAgenda('${date}', ${index})">✖</button>`;
                agendaList.appendChild(agendaItem);
            });

            dateElement.appendChild(agendaList);
            agendaContainer.appendChild(dateElement);
        });
    }

    // Fonction pour supprimer un rendez-vous spécifique
    window.deleteAgenda = function (date, noteIndex) {
        const agendas = JSON.parse(localStorage.getItem('agendas')) || {};
        if (agendas[date]) {
            agendas[date].splice(noteIndex, 1);
            if (agendas[date].length === 0) {
                delete agendas[date];
            }
            localStorage.setItem('agendas', JSON.stringify(agendas));
            loadAgenda();
        }
    };

    // Fonction pour filtrer les rendez-vous de l'agenda
    window.filterAgenda = function () {
        const filterValue = document.getElementById('agenda-filter').value.toLowerCase();
        const agendaContainer = document.getElementById('agenda-container');
        const dates = agendaContainer.querySelectorAll('.agenda-date');

        dates.forEach(dateElement => {
            const dateText = dateElement.querySelector('strong').textContent.toLowerCase();
            const notesText = Array.from(dateElement.querySelectorAll('.agenda-item'))
                .map(note => note.textContent.toLowerCase())
                .join(' ');

            if (dateText.includes(filterValue) || notesText.includes(filterValue)) {
                dateElement.style.display = '';
            } else {
                dateElement.style.display = 'none';
            }
        });
    };

    // Fonction pour ajouter un article à la liste de courses
    window.addShoppingItem = function () {
        const item = document.getElementById('shopping-item').value.trim();
        if (item === '') return;

        const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
        shoppingList.push(item);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

        loadShoppingList();
        document.getElementById('shopping-item').value = '';
    };

    // Fonction pour charger la liste de courses depuis le localStorage
    function loadShoppingList() {
        const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
        const shoppingListContainer = document.getElementById('shopping-list');
        shoppingListContainer.innerHTML = ''; // Efface les anciens articles

        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item} 
                <button onclick="deleteShoppingItem(${index})">✖</button>`;
            shoppingListContainer.appendChild(listItem);
        });
    }

    // Fonction pour supprimer un article de la liste de courses
    window.deleteShoppingItem = function (index) {
        const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
        shoppingList.splice(index, 1);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        loadShoppingList();
    };

    // Charger les données au chargement de la page
    loadAgenda();
    loadShoppingList();
});
