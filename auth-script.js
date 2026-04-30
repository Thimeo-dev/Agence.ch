import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    sendSignInLinkToEmail, 
    isSignInWithEmailLink, 
    signInWithEmailLink 
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
const authForm = document.getElementById('auth-form');
const errorContainer = document.getElementById('error-message');
const submitBtn = document.getElementById('submit-btn');
const emailField = document.getElementById('email_field');

// --- 1. VÉRIFICATION DU RETOUR PAR EMAIL ---
// Cette fonction s'exécute dès que la page charge pour voir si on vient du mail
async function finalizeLogin() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        
        // Si l'utilisateur a changé d'appareil/navigateur entre-temps
        if (!email) {
            email = window.prompt("Veuillez confirmer votre adresse email pour finaliser la connexion :");
        }

        try {
            await signInWithEmailLink(auth, email, window.location.href);
            window.localStorage.removeItem('emailForSignIn');
            window.location.href = 'myaccount.html'; // Redirection vers le compte
        } catch (error) {
            console.error("Erreur de finalisation:", error);
            handleError({ code: 'link-expired' });
        }
    }
}

// --- 2. ENVOI DU LIEN MAGIQUE ---
if (authForm) {
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailField.value.trim();

        if (!email) return;

        errorContainer.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Envoi en cours...</span>';

        const actionCodeSettings = {
            // URL de retour (doit être la même page ou index)
            url: window.location.href, 
            handleCodeInApp: true,
        };

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            
            // Sauvegarde de l'email pour le retour
            window.localStorage.setItem('emailForSignIn', email);
            
            submitBtn.textContent = "Lien envoyé !";
            alert("Un lien de connexion a été envoyé à " + email + ". Vérifiez vos courriers indésirables.");
        } catch (error) {
            handleError(error);
            submitBtn.disabled = false;
            submitBtn.textContent = "Réessayer";
        }
    });
}

// --- 3. GESTION DES ERREURS ---
function handleError(error) {
    errorContainer.style.display = 'block';
    console.error("Auth Error:", error.code);
    
    switch (error.code) {
        case 'auth/invalid-email':
            errorContainer.innerText = 'Format d\'email invalide.';
            break;
        case 'auth/too-many-requests':
            errorContainer.innerText = 'Trop de tentatives. Réessayez plus tard.';
            break;
        case 'link-expired':
            errorContainer.innerText = 'Le lien a expiré ou a déjà été utilisé.';
            break;
        default:
            errorContainer.innerText = 'Une erreur est survenue lors de l\'envoi du mail.';
    }
}

// --- 4. CHARGEMENT TÉMOIGNAGE GITHUB ---
async function chargerTemoignageDepuisGithub() {
    const urlGithub = "https://raw.githubusercontent.com/Thimeo-dev/Agence.ch/refs/heads/main/temoignage.txt";
    try {
        const reponse = await fetch(urlGithub, { cache: "no-store" });
        if (!reponse.ok) throw new Error("Fichier introuvable");

        const contenu = await reponse.text();
        const lignes = contenu.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        if (lignes.length > 0) {
            const ligneChoisie = lignes[Math.floor(Math.random() * lignes.length)];
            const parts = ligneChoisie.split('|');

            if (parts.length >= 3) {
                document.getElementById('testimonial-text').innerText = `"${parts[0].trim()}"`;
                document.getElementById('testimonial-user').innerText = parts[1].trim();
                document.getElementById('testimonial-pic').src = parts[2].trim();
            }
        }
    } catch (erreur) {
        console.error("Erreur témoignage:", erreur);
    }
}

// --- LANCEMENT ---
window.addEventListener('DOMContentLoaded', () => {
    chargerTemoignageDepuisGithub();
    finalizeLogin();
});