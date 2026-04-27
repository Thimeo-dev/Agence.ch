// 1. Importation des fonctions Firebase via CDN (indispensable pour les navigateurs)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 2. Ta configuration Firebase (Tes clés)
const firebaseConfig = {
  apiKey: "AIzaSyCCKXBzJWFYUhziS40X6dH5VkeiTUTHv6A",
  authDomain: "agencech-72ed4.firebaseapp.com",
  projectId: "agencech-72ed4",
  storageBucket: "agencech-72ed4.firebasestorage.app",
  messagingSenderId: "510952112515",
  appId: "1:510952112515:web:f530a16f16ba27fa6b76b6",
  measurementId: "G-W5YM04M7VM"
};

// 3. Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4. Gestion du formulaire de connexion
const loginForm = document.getElementById('auth-form');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email_field').value;
        const password = document.getElementById('password_field').value;
        const btn = document.querySelector('.sign-in_btn');

        // Petit effet de chargement
        const originalText = btn.innerHTML;
        btn.innerHTML = "<span>Connexion...</span>";

        // Tentative de connexion
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Connecté !", userCredential.user);
                window.location.href = "index.html"; // Ou ta page admin
            })
            .catch((error) => {
                console.error("Erreur :", error.code);
                btn.innerHTML = originalText;
                alert("Erreur de connexion : " + error.message);
            });
    });
}