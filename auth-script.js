import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const actionCodeSettings = {
    // L'URL vers laquelle l'utilisateur est renvoyé après avoir cliqué sur l'email
    url: 'https://thimeo-dev.github.io/Agence.ch/auth.html', 
    handleCodeInApp: true,
};

// Gestion du formulaire de connexion
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            // On stocke l'email localement pour ne pas le redemander au retour
            window.localStorage.setItem('emailForSignIn', email);
            alert("Lien de connexion envoyé ! Vérifiez votre boîte mail.");
        } catch (error) {
            console.error("Erreur d'envoi :", error);
            alert("Impossible d'envoyer l'email.");
        }
    });
}
// 1. Config
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

const ADMIN_EMAIL = "thimeosousa02@gmail.com"; // Remplace par ton email administratif

const renderHeader = (user, userPhoto) => {
    // Image par défaut (un avatar gris standard)
    const defaultPic = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    
    // userPhoto vient maintenant de Firestore
    const displayPhoto = userPhoto || defaultPic;
    
    const isAdmin = user && user.email === "thimeosousa02@gmail.com";

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
            <nav>
                <ul id="nav-links">
                    ${authLinks}
                </ul>
            </nav>
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
            <a href="https://github.com/Thimeo-dev/Agence.ch" aria-label="Github"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="Facebook"></a>
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
        
        // Récupérer la photo depuis Firestore
        let userPhoto = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        if (user) {
            try {
                const userDoc = await getDoc(doc(db, "utilisateurs", user.uid));
                if (userDoc.exists() && userDoc.data().photo) {
                    userPhoto = userDoc.data().photo;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la photo:", error);
            }
        }
        
        hPlace.innerHTML = renderHeader(user, userPhoto);

        if (user) {
            const profilePic = document.getElementById('profile-pic');
            const profileDropdown = document.getElementById('profile-dropdown');

            if (profilePic && profileDropdown) {
                profilePic.addEventListener('click', (e) => {
                    e.stopPropagation();
                    profileDropdown.classList.toggle('show');
                });

                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.profile-menu')) {
                        profileDropdown.classList.remove('show');
                    }
                });
            }

            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    signOut(auth).then(() => {
                        window.location.href = 'auth.html';
                    });
                });
            }
        }

        const isAdmin = user && user.email === "thimeosousa02@gmail.com";
        const isOnAdminPage = window.location.pathname.endsWith('admin.html');
        if (isOnAdminPage && !isAdmin) {
            window.location.href = 'index.html';
        }
    };

    render(null);
    onAuthStateChanged(auth, render);
});

async function chargerTemoignageDepuisGithub() {
    const urlGithub = "https://raw.githubusercontent.com/Thimeo-dev/Agence.ch/refs/heads/main/temoignage.txt";

    try {
        const reponse = await fetch(urlGithub, { cache: "no-store" });
        if (!reponse.ok) throw new Error("Fichier introuvable");

        const contenu = await reponse.text();
        const lignes = contenu.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        if (lignes.length > 0) {
            const indexAleatoire = Math.floor(Math.random() * lignes.length);
            const ligneChoisie = lignes[indexAleatoire];

            // On découpe la ligne avec le séparateur "|"
            const parts = ligneChoisie.split('|');

            if (parts.length >= 3) {
                const texte = parts[0].trim();
                const nom = parts[1].trim();
                const image = parts[2].trim();

                // Mise à jour du texte
                document.getElementById('testimonial-text').innerText = `"${texte}"`;
                // Mise à jour du nom
                document.getElementById('testimonial-user').innerText = nom;
                // Mise à jour de la photo (attention au chemin du dossier images)
                document.getElementById('testimonial-pic').src = image;
            }
        }
    } catch (erreur) {
        console.error("Erreur de chargement :", erreur);
    }
}

window.addEventListener('DOMContentLoaded', chargerTemoignageDepuisGithub);
