import { db } from './firebase.js';
import { ref, set, get, update, remove } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';
import { auth } from './auth.js';

// Save shopping list
function saveShoppingList(list) {
    const userId = auth.currentUser.uid;
    set(ref(db, 'shoppingList/' + userId), list).then(() => {
        console.log('Shopping list saved');
    }).catch((error) => {
        console.error('Error saving shopping list:', error);
    });
}

// Load shopping list
async function loadShoppingList() {
    const userId = auth.currentUser.uid;
    const shoppingListRef = ref(db, 'shoppingList/' + userId);
    try {
        const snapshot = await get(shoppingListRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No shopping list found');
        }
    } catch (error) {
        console.error('Error loading shopping list:', error);
    }
}

// Add item to shopping list
function addItem(item) {
    const userId = auth.currentUser.uid;
    update(ref(db, 'shoppingList/' + userId), { [item]: true }).then(() => {
        console.log('Item added');
    }).catch((error) => {
        console.error('Error adding item:', error);
    });
}

// Remove item from shopping list
function removeItem(item) {
    const userId = auth.currentUser.uid;
    remove(ref(db, 'shoppingList/' + userId + '/' + item)).then(() => {
        console.log('Item removed');
    }).catch((error) => {
        console.error('Error removing item:', error);
    });
}

export { saveShoppingList, loadShoppingList, addItem, removeItem };
