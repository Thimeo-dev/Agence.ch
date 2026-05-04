import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { translations } from "./translations.js";

const defaultLang = "fr";
const supportedLangs = Object.keys(translations);

const normalizeLangCode = (lang) => {
    if (!lang || typeof lang !== "string") return defaultLang;
    const code = lang.toLowerCase().slice(0, 2);
    return supportedLangs.includes(code) ? code : defaultLang;
};

const getCurrentLang = () => {
    const stored = localStorage.getItem("lang");
    if (stored) return normalizeLangCode(stored);
    const browser = navigator.language || navigator.userLanguage || defaultLang;
    return normalizeLangCode(browser);
};

const setCurrentLang = (lang) => {
    const normalized = normalizeLangCode(lang);
    localStorage.setItem("lang", normalized);
    document.documentElement.lang = normalized;
    return normalized;
};

const translatePage = () => {
    const lang = getCurrentLang();
    document.documentElement.lang = lang;
    const translationsForLang = translations[lang] || translations[defaultLang];
    document.querySelectorAll("[data-key]").forEach((el) => {
        const key = el.dataset.key;
        const text = translationsForLang[key] || translations[defaultLang][key] || el.textContent;
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            if ("placeholder" in el) {
                el.placeholder = text;
            } else {
                el.value = text;
            }
        } else {
            el.innerHTML = text;
        }
    });
};

const changeLang = (lang) => {
    setCurrentLang(lang);
    // Sauvegarder aussi le code de région pour l'affichage au footer
    localStorage.setItem("region", lang);
    translatePage();
    if (window.location.pathname.endsWith("languageselection.html")) {
        window.location.href = "index.html";
    }
};

window.changeLang = changeLang;
window.translatePage = translatePage;

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
const analytics = getAnalytics(app);

const ADMIN_EMAIL = "thimeosousa02@gmail.com"; // Remplace par ton email administratif

const renderHeader = (user, userPhoto) => {
    const defaultPic = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    const displayPhoto = userPhoto || defaultPic;
    const isAdmin = user && user.email === "thimeosousa02@gmail.com";

    const authLinks = user
        ? `
            <li><a href="index.html" data-key="nav_home">Accueil</a></li>
            <li class="profile-menu">
                <img src="${displayPhoto}" alt="Profil" class="profile-pic" id="profile-pic">
                <div class="profile-dropdown" id="profile-dropdown">
                    <a href="myaccount.html" data-key="nav_myaccount">Mon compte</a>
                    ${isAdmin ? '<a href="admin.html" data-key="nav_admin">Tableau de bord</a>' : ''}
                    <hr>
                    <button type="button" id="logout-btn" class="logout-option" data-key="nav_logout">Déconnexion</button>
                </div>
            </li>
        `
        : `
            <li><a href="index.html" data-key="nav_home">Accueil</a></li>
            <li><a href="auth.html" class="login-btn" id="auth-btn" data-key="nav_login">Connexion</a></li>
        `;

    return `
        <header>
            <div class="logo-area">
                <img src="agence180.svg" alt="Logo Agence">
                <span class="brand-name">Agence.ch</span>
            </div>

            <!-- Barre de recherche style Uiverse -->
            <div class="container-input">
                <div class="search-wrapper">
                    <svg fill="#000000" width="18px" height="18px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                        <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.179 1226.997 0 790.588 0S0 354.179 0 790.588s354.179 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 96.452-96.452-512.631-512.753Z" fill-rule="evenodd"></path>
                    </svg>
                    <input type="text" placeholder="Rechercher un pays..." class="input" id="country-search" onkeyup="filterCountries()">
                </div>
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
            <!-- On entoure l'info par un lien vers ta nouvelle page -->
            <a href="languageselection.html" class="country-link">
                <div class="country-info">
                    <img src="https://flagcdn.com/w20/ch.png" alt="Suisse" id="country-flag">
                    <span id="country-name">Suisse</span>
                </div>
            </a>
            <div class="footer-legal-links">
                <a href="confidentialite.html" data-key="footer_privacy">Confidentialité</a>
                <a href="conditions.html" data-key="footer_terms">Conditions</a>
                <a href="renseignements.html" data-key="footer_info">Renseignements</a>
                <a href="assistance.html" data-key="footer_help">Assistance</a>
                <p data-key="footer_copyright">© 2026 Agence.ch</p>
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

const countryFlags = {
    "fr": { name: "Suisse", flag: "ch" },
    "de": { name: "Schweiz", flag: "ch" },
    "en": { name: "United Kingdom", flag: "gb" },
    "es": { name: "México", flag: "mx" },
    "jp": { name: "日本", flag: "jp" },
    "ma": { name: "台灣", flag: "tw" }
};

const updateCountryDisplay = () => {
    const region = localStorage.getItem("region") || "fr";
    const countryInfo = countryFlags[region] || countryFlags["fr"];
    
    const countryNameEl = document.getElementById("country-name");
    const countryFlagEl = document.getElementById("country-flag");
    
    if (countryNameEl) countryNameEl.textContent = countryInfo.name;
    if (countryFlagEl) countryFlagEl.src = `https://flagcdn.com/w20/${countryInfo.flag}.png`;
};

document.addEventListener("DOMContentLoaded", () => {
    const hPlace = document.getElementById('header-placeholder');
    const fPlace = document.getElementById('footer-placeholder');

    if (fPlace) fPlace.innerHTML = footerHTML;
    
    // Traduire immédiatement après injection du footer
    setTimeout(() => {
        updateCountryDisplay();
        translatePage();
    }, 0);

    const render = async (user) => {
        if (!hPlace) return;
        
        // Récupérer la photo depuis Firestore
        let userPhoto = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        if (user) {
            try {
                const userDoc = await getDoc(doc(db, "utilisateurs", user.uid));
                if (userDoc.exists() && userDoc.data().photo) {
                    let photo = userDoc.data().photo;
                    
                    // Si c'est du base64, ajouter le préfixe data:image
                    if (photo.startsWith('data:image') || photo.includes(',')) {
                        userPhoto = photo;
                    } else if (photo.startsWith('/') || photo.includes('http')) {
                        userPhoto = photo;
                    } else if (photo.trim().length > 0) {
                        // Sinon, c'est probablement du base64 sans préfixe
                        userPhoto = `data:image/jpeg;base64,${photo}`;
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la photo:", error);
            }
        }
        
        hPlace.innerHTML = renderHeader(user, userPhoto);
        updateCountryDisplay();
        translatePage();

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


// On ajoute le HTML de la carte cookie
const cookieHTML = `
<div id="cookie-notice" class="cookie-card">
    <div id="cookie-main-view">
        <span class="title" data-key="cookie_title">🍪 Paramètres des cookies</span>
        <p class="description" data-key="cookie_desc">
            Nous utilisons des cookies pour améliorer votre expérience. 
            <a href="confidentialite.html">En savoir plus</a>.
        </p>
        
        <!-- Section des préférences cachée au début -->
        <div id="cookie-options" style="display: none; margin-top: 15px; border-top: 1px solid #eee; pt-3">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                <span style="font-size: 0.8rem; color: #333;">Essentiels</span>
                <input type="checkbox" checked disabled> <!-- Toujours activé -->
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                <span style="font-size: 0.8rem; color: #333;">Analytiques</span>
                <input type="checkbox" id="cookies-analytics">
            </div>
        </div>

        <div class="actions">
            <button class="pref" id="btn-toggle-prefs" data-key="cookie_customize">
                Personnaliser
            </button>
            <button class="accept" id="accept-cookies" data-key="cookie_accept">
                Accepter
            </button>
        </div>
    </div>
</div>
`;
document.addEventListener("DOMContentLoaded", function() {
    // Vérifier si les cookies ont déjà été acceptés
    if (localStorage.getItem('cookies-accepted') === 'true') {
        // Ne pas injecter la notification si déjà acceptée
        return;
    }
    
    const cookieNotice = document.getElementById('cookie-notice');
    const cookieOptions = document.getElementById('cookie-options');
    const togglePrefsBtn = document.getElementById('btn-toggle-prefs');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!cookieNotice || !acceptBtn) {
        return;
    }

    // Affichage initial
    cookieNotice.style.display = 'block';

    // Basculer l'affichage des préférences
    togglePrefsBtn.addEventListener('click', function() {
        if (cookieOptions.style.display === 'none') {
            cookieOptions.style.display = 'block';
            togglePrefsBtn.textContent = 'Masquer';
        } else {
            cookieOptions.style.display = 'none';
            togglePrefsBtn.textContent = 'Personnaliser';
        }
    });

    // Sauvegarder les choix
    acceptBtn.addEventListener('click', function() {
        const analytics = document.getElementById('cookies-analytics').checked;
        
        localStorage.setItem('cookies-accepted', 'true');
        localStorage.setItem('cookies-analytics-allowed', analytics);
        
        cookieNotice.style.display = 'none';
    });
});

// On l'injecte dans le body SEULEMENT si pas encore accepté
if (localStorage.getItem('cookies-accepted') !== 'true') {
    document.body.insertAdjacentHTML('beforeend', cookieHTML);
}