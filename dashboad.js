import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

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
const db = getDatabase(app);

let agenda = {};
let shoppingList = [];
let isReadOnly = false;

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = 'block';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('theme-dark');
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.textContent = document.body.classList.contains('theme-dark') ? '🌙' : '🌞';
    }
}

function loadAgenda() {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const agendaRef = ref(db, 'agenda/' + userId);
        onValue(agendaRef, (snapshot) => {
            agenda = snapshot.val() || {};
            renderAgenda();
        });
    }
}

function saveAgenda() {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const agendaRef = ref(db, 'agenda/' + userId);
        set(agendaRef, agenda)
            .catch(error => console.error('Error saving agenda:', error.message));
    }
}

function addAppointment() {
    if (isReadOnly) return;

    const date = document.getElementById('date-input').value;
    const time = document.getElementById('time-input').value;
    const note = document.getElementById('note-input').value;
    const priority = document.getElementById('priority').value;

    if (date && time && note) {
        const key = `${date} ${time}`;
        agenda[key] = { note, priority };
        saveAgenda();
        renderAgenda();
    }
}

function renderAgenda() {
    const agendaList = document.getElementById('agenda-list');
    agendaList.innerHTML = '';

    for (const [key, value] of Object.entries(agenda)) {
        const li = document.createElement('li');
        li.textContent = `${key} - ${value.note} (${value.priority})`;

        if (!isReadOnly) {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.classList.add('delete');
            deleteBtn.onclick = () => {
                delete agenda[key];
                saveAgenda();
                renderAgenda();
            };

            li.appendChild(deleteBtn);
        }

        agendaList.appendChild(li);
    }
}

function loadShoppingList() {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const shoppingListRef = ref(db, 'shoppingList/' + userId);
        onValue(shoppingListRef, (snapshot) => {
            shoppingList = snapshot.val() || [];
            renderShoppingList();
        });
    }
}

function saveShoppingList() {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const shoppingListRef = ref(db, 'shoppingList/' + userId);
        set(shoppingListRef, shoppingList)
            .catch(error => console.error('Error saving shopping list:', error.message));
    }
}

function addItem() {
    if (isReadOnly) return;

    const item = document.getElementById('item-input').value;
    if (item) {
        shoppingList.push(item);
        saveShoppingList();
        renderShoppingList();
    }
}

function renderShoppingList() {
    const shoppingListItems = document.getElementById('shopping-list-items');
    shoppingListItems.innerHTML = '';

    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        if (!isReadOnly) {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.classList.add('delete');
            deleteBtn.onclick = () => {
                shoppingList.splice(index, 1);
                saveShoppingList();
                renderShoppingList();
            };

            li.appendChild(deleteBtn);
        }

        shoppingListItems.appendChild(li);
    });
}

function toggleAuthFrame(show) {
    const authFrame = document.getElementById('auth-frame');
    authFrame.style.display = show ? 'flex' : 'none';
}

function handleSignOut() {
    signOut(auth).then(() => {
        window.location.href = 'index.html'; // Redirect to login page
    }).catch(error => alert('Error: ' + error.message));
}

function setupEventListeners() {
    document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
    document.getElementById('add-appointment-btn').addEventListener('click', addAppointment);
    document.getElementById('add-item-btn').addEventListener('click', addItem);
    document.getElementById('logout-btn').addEventListener('click', handleSignOut);

    document.addEventListener('DOMContentLoaded', () => {
        const user = auth.currentUser;
        if (user) {
            document.getElementById('main-content').classList.remove('hidden');
            loadAgenda();
            loadShoppingList();
        } else {
            window.location.href = 'index.html'; // Redirect to login page if not authenticated
        }
    });
}

setupEventListeners();
