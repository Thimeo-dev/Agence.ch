import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

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

const ADMIN_EMAIL = "ton-email@exemple.com"; // Remplace par ton email administratif

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

    const authForm = document.getElementById('auth-form');
    const switchAuth = document.getElementById('switch-auth');
    const authTitle = document.getElementById('auth-title');
    const authDesc = document.getElementById('auth-desc');
    const submitBtn = document.getElementById('submit-btn');
    const toggleText = document.getElementById('toggle-text');
    const errorMessage = document.getElementById('error-message');

    let isLoginMode = true;

    const setError = (message) => {
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    };

    const updateAuthMode = () => {
        if (!authTitle || !authDesc || !submitBtn || !toggleText || !switchAuth) return;

        if (isLoginMode) {
            authTitle.textContent = 'Espace Membre';
            authDesc.textContent = 'Connectez-vous pour accéder à votre espace.';
            submitBtn.textContent = 'Connexion';
            toggleText.textContent = 'Pas encore de compte ?';
            switchAuth.textContent = "S'inscrire";
        } else {
            authTitle.textContent = 'Inscription';
            authDesc.textContent = 'Créez un compte pour accéder à votre espace.';
            submitBtn.textContent = 'S’inscrire';
            toggleText.textContent = 'Vous avez déjà un compte ?';
            switchAuth.textContent = 'Se connecter';
        }

        setError('');
    };

    if (switchAuth) {
        switchAuth.addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            updateAuthMode();
        });
    }

    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!authForm) return;

            const emailField = document.getElementById('email_field');
            const passwordField = document.getElementById('password_field');

            const email = emailField?.value.trim();
            const password = passwordField?.value;

            if (!email || !password) {
                setError('Veuillez saisir un email et un mot de passe.');
                return;
            }

            submitBtn.disabled = true;
            setError('');

            try {
                if (isLoginMode) {
                    await signInWithEmailAndPassword(auth, email, password);
                } else {
                    await createUserWithEmailAndPassword(auth, email, password);
                }
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Erreur d’authentification :', error);
                const message = error?.message || 'Erreur lors de la connexion.';
                setError(message.replace('Firebase:', '').trim());
            } finally {
                submitBtn.disabled = false;
            }
        });
    }

    updateAuthMode();

    render(null);
    onAuthStateChanged(auth, (user) => {
        render(user);
        if (user && window.location.pathname.endsWith('auth.html')) {
            window.location.href = 'index.html';
        }
    });
});


