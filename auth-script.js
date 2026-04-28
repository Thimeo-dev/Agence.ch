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
// ... (ton code d'initialisation Firebase au début)

const loginForm = document.getElementById('auth-form');
const errorContainer = document.getElementById('error-message');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // On cache l'erreur précédente au début d'une nouvelle tentative
        errorContainer.style.display = 'none';

        const email = document.getElementById('email_field').value;
        const password = document.getElementById('password_field').value;
        const btn = document.querySelector('.sign-in_btn');

        btn.innerHTML = "<span>Vérification...</span>";

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                window.location.href = "index.html";
            })
            .catch((error) => {
                btn.innerHTML = "Connexion";
                
                // On affiche le message personnalisé
                errorContainer.style.display = 'block';
                
                // Traduction des erreurs Firebase
                switch (error.code) {
                    case 'auth/invalid-credential':
                        errorContainer.innerText = "Email ou mot de passe incorrect.";
                        break;
                    case 'auth/user-disabled':
                        errorContainer.innerText = "Ce compte a été désactivé.";
                        break;
                    case 'auth/too-many-requests':
                        errorContainer.innerText = "Trop de tentatives. Réessayez plus tard.";
                        break;
                    default:
                        errorContainer.innerText = "Une erreur est survenue. Veuillez réessayer.";
                }
            });
    });
}

// --- 6. FONCTION DE DÉCONNEXION ---
window.logout = () => {
    signOut(auth).then(() => {
        window.location.href = "auth.html";
    });
};