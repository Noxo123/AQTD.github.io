import { db } from './firebase.js';
import { ref, set, get, update, remove } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';
import { auth } from './auth.js';

// Save agenda
function saveAgenda(agenda) {
    const userId = auth.currentUser.uid;
    set(ref(db, 'agenda/' + userId), agenda).then(() => {
        console.log('Agenda saved');
    }).catch((error) => {
        console.error('Error saving agenda:', error);
    });
}

// Load agenda
async function loadAgenda() {
    const userId = auth.currentUser.uid;
    const agendaRef = ref(db, 'agenda/' + userId);
    try {
        const snapshot = await get(agendaRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No agenda found');
        }
    } catch (error) {
        console.error('Error loading agenda:', error);
    }
}

// Add appointment
function addAppointment(date, time, note) {
    const userId = auth.currentUser.uid;
    const appointmentKey = `${date}_${time}`;
    const appointmentData = { note: note, time: time };
    
    update(ref(db, 'agenda/' + userId + '/' + appointmentKey), appointmentData).then(() => {
        console.log('Appointment added');
    }).catch((error) => {
        console.error('Error adding appointment:', error);
    });
}

// Delete appointment
function deleteAppointment(date, time) {
    const userId = auth.currentUser.uid;
    const appointmentKey = `${date}_${time}`;
    
    remove(ref(db, 'agenda/' + userId + '/' + appointmentKey)).then(() => {
        console.log('Appointment deleted');
    }).catch((error) => {
        console.error('Error deleting appointment:', error);
    });
}

export { saveAgenda, loadAgenda, addAppointment, deleteAppointment };
