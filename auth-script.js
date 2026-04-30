import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

// Éléments du DOM
const loginForm = document.getElementById('auth-form');
const errorContainer = document.getElementById('error-message');
const submitBtn = document.getElementById('submit-btn');
const authTitle = document.getElementById('auth-title');
const authDesc = document.getElementById('auth-desc');
const switchBtn = document.getElementById('switch-auth');
const toggleText = document.getElementById('toggle-text');

let isLoginMode = true; // Mode par défaut

// --- BASCULER ENTRE CONNEXION ET INSCRIPTION ---
if (switchBtn) {
    switchBtn.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        
        // Mise à jour visuelle
        authTitle.textContent = isLoginMode ? "Connexion" : "Créer un compte";
        authDesc.textContent = isLoginMode ? "Connectez-vous pour accéder à votre espace." : "Inscrivez-vous pour accéder au plein potentiel du site.";
        submitBtn.textContent = isLoginMode ? "Connexion" : "S'inscrire";
        toggleText.textContent = isLoginMode ? "Pas encore de compte ?" : "Déjà membre ?";
        switchBtn.textContent = isLoginMode ? "S'inscrire" : "Se connecter";
        
        if (errorContainer) {
            errorContainer.style.display = 'none';
        }
    });
}

// --- GÉRER LA SOUMISSION ---
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email_field').value;
        const password = document.getElementById('password_field').value;

        errorContainer.style.display = 'none';
        submitBtn.innerHTML = '<span>Patientez...</span>';

        if (isLoginMode) {
            // CONNEXION
            signInWithEmailAndPassword(auth, email, password)
                .then(() => window.location.href = 'index.html')
                .catch((error) => handleError(error));
        } else {
            // INSCRIPTION
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => window.location.href = 'index.html')
                .catch((error) => handleError(error));
        }
    });
}

// --- GESTION DES ERREURS ---
function handleError(error) {
    submitBtn.textContent = isLoginMode ? "Connexion" : "S'inscrire";
    errorContainer.style.display = 'block';
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            errorContainer.innerText = 'Cet email est déjà utilisé.';
            break;
        case 'auth/weak-password':
            errorContainer.innerText = 'Mot de passe trop court (6 caractères min).';
            break;
        case 'auth/invalid-email':
            errorContainer.innerText = 'Format d\'email invalide.';
            break;
        case 'auth/wrong-password':
        case 'auth/user-not-found':
            errorContainer.innerText = 'Email ou mot de passe incorrect.';
            break;
        default:
            errorContainer.innerText = 'Une erreur est survenue. Réessayez.';
    }
}

async function chargerTemoignageDepuisGithub() {
    const urlGithub = "https://raw.githubusercontent.com/Thimeo-dev/Agence.ch/refs/heads/main/temoignage.txt";

    try {
        const reponse = await fetch(urlGithub, { cache: "no-store" });
        if (!reponse.ok) throw new Error("Fichier introuvable");

        const contenu = await reponse.text();
        
        // 1. On sépare le texte en un tableau de lignes (en ignorant les lignes vides)
        const lignes = contenu.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        if (lignes.length > 0) {
            // 2. On choisit un index au hasard entre 0 et la longueur du tableau
            const indexAleatoire = Math.floor(Math.random() * lignes.length);
            const citationChoisie = lignes[indexAleatoire];

            // 3. Injection dans le HTML
            const element = document.getElementById('testimonial-text');
            if (element) {
                element.innerText = `"${citationChoisie}"`;
            }
        }
    } catch (erreur) {
        console.error("Erreur GitHub :", erreur);
        const element = document.getElementById('testimonial-text');
        if (element) element.innerText = "Citation en cours de mise à jour...";
    }
}

window.addEventListener('DOMContentLoaded', chargerTemoignageDepuisGithub);