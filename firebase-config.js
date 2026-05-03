import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
// 1. Ajout de l'import pour Analytics
import { getAnalytics, setAnalyticsCollectionEnabled } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyCCKXBzJWFYUhziS40X6dH5VkeiTUTHv6A",
    authDomain: "agencech-72ed4.firebaseapp.com",
    projectId: "agencech-72ed4",
    storageBucket: "agencech-72ed4.firebasestorage.app",
    messagingSenderId: "510952112515",
    appId: "1:510952112515:web:f530a16f16ba27fa6b76b6",
    measurementId: "G-W5YM04M7VM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 2. Initialisation d'Analytics
const analytics = getAnalytics(app);

// 3. Désactivation de la collecte par défaut (Privacy by Design)
// Cela empêche Firebase d'envoyer des données avant que l'utilisateur n'accepte ta pop-up.
setAnalyticsCollectionEnabled(analytics, false);

// 4. Ajout de "analytics" dans l'export
export { auth, db, storage, analytics };