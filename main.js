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

// 1. On définit le préfixe de chemin au début de la fonction
const isSubFolder = window.location.pathname.includes('/pays/');
const pathPrefix = isSubFolder ? '../' : './';

// 2. On prépare les liens (n'oublie pas d'ajouter le préfixe aux href aussi !)
const authLinks = user
    ? `
        <li><a href="${pathPrefix}index.html" data-key="nav_home"></a></li>
        <li class="profile-menu">
            <img src="${displayPhoto}" alt="Profil" class="profile-pic" id="profile-pic">
            <div class="profile-dropdown" id="profile-dropdown">
                <a href="${pathPrefix}myaccount.html" data-key="nav_myaccount"></a>
                ${isAdmin ? `<a href="${pathPrefix}admin.html" data-key="nav_admin"></a>` : ''}
                <hr>
                <button type="button" id="logout-btn" class="logout-option" data-key="nav_logout"></button>
            </div>
        </li>
    `
    : `
        <li><a href="${pathPrefix}index.html" data-key="nav_home"></a></li>
        <li><a href="${pathPrefix}auth.html" class="login-btn" id="auth-btn" data-key="nav_login"></a></li>
    `;

// 3. On retourne le HTML avec le chemin du logo dynamique
return `
    <header>
        <div class="logo-area">
            <img src="${pathPrefix}agence180.svg" alt="Logo Agence">
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
            <!-- On entoure l'info par un lien vers ta nouvelle page -->
            <a href="languageselection.html" class="country-link">
                <div class="country-info">
                    <img src="https://flagcdn.com/w20/ch.png" alt="Suisse" id="country-flag">
                    <span id="country-name">Suisse</span>
                </div>
            </a>
            <div class="footer-legal-links">
                <a href="confidentialite.html" data-key="footer_privacy"></a>
                <a href="conditions.html" data-key="footer_terms"></a>
                <a href="renseignements.html" data-key="footer_info"></a>
                <a href="assistance.html" data-key="footer_help"></a>
                <a href="reglage.html" data-key="footer_reglage">reg</a>
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
    // --- EUROPE ---
    "fr_CH": { name: "Suisse", flag: "ch" },
    "de_CH": { name: "Schweiz", flag: "ch" },
    "fr_FR": { name: "France", flag: "fr" },
    "fr_BE": { name: "Belgique", flag: "be" },
    "en_GB": { name: "United Kingdom", flag: "gb" },
    "de_DE": { name: "Deutschland", flag: "de" },
    "it_IT": { name: "Italia", flag: "it" },
    "es_ES": { name: "España", flag: "es" },
    "pt_PT": { name: "Portugal", flag: "pt" },
    "nl_NL": { name: "Nederland", flag: "nl" },

    // --- AMÉRIQUES ---
    "en_US": { name: "United States", flag: "us" },
    "fr_CA": { name: "Canada (FR)", flag: "ca" },
    "en_CA": { name: "Canada (EN)", flag: "ca" },
    "es_MX": { name: "México", flag: "mx" },
    "pt_BR": { name: "Brasil", flag: "br" },
    "es_AR": { name: "Argentina", flag: "ar" },

    // --- ASIE & OCÉANIE ---
    "ja_JP": { name: "日本", flag: "jp" },
    "zh_CN": { name: "中国", flag: "cn" },
    "ko_KR": { name: "대한민국", flag: "kr" },
    "en_AU": { name: "Australia", flag: "au" },
    "hi_IN": { name: "India", flag: "in" },

    // --- AFRIQUE & MOYEN-ORIENT ---
    "ar_MA": { name: "Maroc", flag: "ma" },
    "ar_DZ": { name: "Algérie", flag: "dz" },
    "ar_EG": { name: "Egypt", flag: "eg" },
    "fr_SN": { name: "Sénégal", flag: "sn" },
    "ar_AE": { name: "UAE", flag: "ae" },
    "en_ZA": { name: "South Africa", flag: "za" }
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
    window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
        // Ajoute la classe 'scrolled' après 20px de descente
        header.classList.toggle("scrolled", window.scrollY > 20);
    }
});

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

// --- À METTRE À LA FIN DE TON MAIN.JS ---

/**
 * Fonction pour cacher le loader proprement
 */
const hideLoader = () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("loader-hidden");
        // On le retire du DOM après l'animation pour libérer de la mémoire
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
};

// Sécurité : Si après 5 secondes rien ne se passe, on force l'affichage du site
setTimeout(hideLoader, 5000);

// Événement de chargement final
window.addEventListener("load", () => {
    // On attend un tout petit peu pour que l'animation de ton header pilule se fasse
    setTimeout(hideLoader, 600);
});