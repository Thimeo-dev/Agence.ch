// 1. Importation des fonctions Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 2. Ta configuration Firebase
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

// --- 3. TON ADRESSE ADMIN ---
const ADMIN_EMAIL = "ton-email@exemple.com"; // REMPLACE PAR TON EMAIL

// --- 4. GESTION DE LA CONNEXION ---
const loginForm = document.getElementById('auth-form');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email_field').value;
        const password = document.getElementById('password_field').value;
        const btn = document.querySelector('.sign-in_btn');
        const originalText = btn.innerHTML;

        btn.innerHTML = "<span>Vérification...</span>";

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Si c'est toi, on va vers l'admin, sinon vers l'accueil
                if (userCredential.user.email === ADMIN_EMAIL) {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "index.html";
                }
            })
            .catch((error) => {
                btn.innerHTML = originalText;
                alert("Accès refusé : " + error.message);
            });
    });
}

// --- 5. PROTECTION DE LA PAGE ADMIN ---
// À placer dans admin.html (ou laisser ici si tu lies ce script à admin.html)
if (window.location.pathname.includes("admin.html")) {
    onAuthStateChanged(auth, (user) => {
        if (!user || user.email !== ADMIN_EMAIL) {
            // Si pas connecté ou pas l'admin, on dégage
            window.location.href = "auth.html";
        }
    });
}

// --- 6. FONCTION DE DÉCONNEXION ---
window.logout = () => {
    signOut(auth).then(() => {
        window.location.href = "auth.html";
    });
};