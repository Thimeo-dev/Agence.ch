import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Config (Garde ta config telle quelle)
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

const ADMIN_EMAIL = "thimeosousa02@gmail.com";

const renderHeader = (user, userPhoto) => {
    const defaultPic = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    const displayPhoto = userPhoto || defaultPic;
    const isAdmin = user && user.email === ADMIN_EMAIL;

    const authLinks = user
        ? `
            <li><a href="index.html">Accueil</a></li>
            <li class="profile-menu">
                <img src="${displayPhoto}" alt="Profil" class="profile-pic" id="profile-pic">
                <div class="profile-dropdown" id="profile-dropdown">
                    <a href="myaccount.html">Mon compte</a>
                    ${isAdmin ? '<a href="admin.html">Tableau de bord</a>' : ''}
                    <hr>
                    <button type="button" id="logout-btn" class="logout-option">Déconnexion</button>
                </div>
            </li>
        `
        : `
            <li><a href="index.html">Accueil</a></li>
            <li><a href="auth.html" class="login-btn" id="auth-btn">Connexion</a></li>
        `;

    return `
        <header>
            <div class="logo-area">
                <img src="agence180.svg" alt="Logo Agence">
                <span class="brand-name">Agence.ch</span>
            </div>
            <nav><ul id="nav-links">${authLinks}</ul></nav>
        </header>
    `;
};

const footerHTML = `
    <footer class="site-footer">
    <div class="footer-container">
        <div class="footer-left">
            <div class="country-info">
                <img src="https://flagcdn.com/w20/ch.png" alt="Suisse">
                <span>Suisse</span>
            </div>
            <div class="footer-legal-links">
                <a href="confidentialite.html">Confidentialité</a>
                <a href="conditions.html">Conditions</a>
                <p>© 2026 Agence.ch</p>
            </div>
        </div>
        <div class="footer-socials">
            <a href="#" aria-label="Instagram"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram"></a>
            <a href="#" aria-label="X"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" alt="X"></a>
            <a href="#" aria-label="TikTok"><img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok"></a>
            <a href="#" aria-label="Facebook"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook"></a>
            <a href="https://github.com/Thimeo-dev/Agence.ch" aria-label="Github"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="Github"></a>
        </div>
    </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
    const hPlace = document.getElementById('header-placeholder');
    const fPlace = document.getElementById('footer-placeholder');

    if (fPlace) fPlace.innerHTML = footerHTML;

    const render = async (user) => {
        if (!hPlace) return;

        // Protection Admin Immédiate
        const isAdmin = user && user.email === ADMIN_EMAIL;
        const isOnAdminPage = window.location.pathname.endsWith('admin.html');
        if (isOnAdminPage && !isAdmin) {
            window.location.href = 'index.html';
            return;
        }
        
        let userPhoto = null;
        if (user) {
            try {
                const userDoc = await getDoc(doc(db, "utilisateurs", user.uid));
                if (userDoc.exists()) {
                    userPhoto = userDoc.data().photo;
                }
            } catch (error) {
                console.error("Erreur Firestore:", error);
            }
        }
        
        hPlace.innerHTML = renderHeader(user, userPhoto);

        // Gestion des événements après injection du HTML
        if (user) {
            const profilePic = document.getElementById('profile-pic');
            const profileDropdown = document.getElementById('profile-dropdown');
            const logoutBtn = document.getElementById('logout-btn');

            if (profilePic && profileDropdown) {
                profilePic.addEventListener('click', (e) => {
                    e.stopPropagation();
                    profileDropdown.classList.toggle('show');
                });
            }

            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    signOut(auth).then(() => { window.location.href = 'auth.html'; });
                });
            }
        }
    };

    // Fermeture du menu au clic ailleurs
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('profile-dropdown');
        if (dropdown && !e.target.closest('.profile-menu')) {
            dropdown.classList.remove('show');
        }
    });

    // UN SEUL APPEL ICI
    onAuthStateChanged(auth, render);
});