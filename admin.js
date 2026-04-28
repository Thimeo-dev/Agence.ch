import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const auth = getAuth();
const ADMIN_EMAIL = "ton-email@agence.ch"; // <--- Vérifie bien l'orthographe ici

onAuthStateChanged(auth, (user) => {
    const authBtn = document.getElementById('auth-btn');
    const ADMIN_EMAIL = "ton-email@agence.ch";

    if (user) {
        // --- MODE CONNECTÉ ---
        const initiale = user.email.charAt(0).toUpperCase();
        
        // On remplace le bouton par un rond
        // Si c'est l'admin, on pointe vers admin.html, sinon vers un profil (ou rien)
        const targetPage = (user.email === ADMIN_EMAIL) ? "admin.html" : "#";
        
        authBtn.outerHTML = `
            <a href="${targetPage}" class="profile-dot" id="auth-btn" title="${user.email}">
                ${initiale}
            </a>
        `;
    } else {
        // --- MODE DÉCONNECTÉ ---
        // Si on n'est pas connecté, on remet le bouton normal
        // Note: l'utilisation de innerHTML ou outerHTML ici dépend si l'élément a été supprimé
        const navUl = document.querySelector('nav ul');
        if (!document.querySelector('.login-btn')) {
             authBtn.outerHTML = `<a href="auth.html" class="login-btn" id="auth-btn">Connexion</a>`;
        }
    }
});