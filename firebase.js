// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCZ4T5QxdqK6pDqWuGecnt4X-CZpT3DaOQ",
  authDomain: "aqtd-5f6ed.firebaseapp.com",
  projectId: "aqtd-5f6ed",
  storageBucket: "aqtd-5f6ed.appspot.com",
  messagingSenderId: "755816540323",
  appId: "1:755816540323:web:e85774039b471fee7cf716",
  measurementId: "G-C59QS88D6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
