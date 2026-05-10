// --- GESTION DU THÈME DYNAMIQUE ---
const themeSelect = document.getElementById('theme-select');

const applyTheme = (theme) => {
    if (theme === 'auto') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('user-theme', theme);
};

if (themeSelect) {
    // Charger la préférence au démarrage
    const savedTheme = localStorage.getItem('user-theme') || 'auto';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);

    themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));
}

// --- GESTION DES COOKIES ---
const cookieToggle = document.getElementById('cookie-analytics-toggle');
if (cookieToggle) {
    // Vérifie si l'utilisateur a déjà accepté les cookies analytiques
    cookieToggle.checked = localStorage.getItem('cookies-accepted') === 'true';

    cookieToggle.addEventListener('change', (e) => {
        localStorage.setItem('cookies-accepted', e.target.checked);
        // Ici tu peux activer/désactiver Google Analytics
    });
}

// Réinitialiser les cookies
document.getElementById('reset-cookies')?.addEventListener('click', () => {
    if(confirm("Voulez-vous vraiment réinitialiser vos préférences de cookies ?")) {
        localStorage.removeItem('cookies-accepted');
        localStorage.removeItem('cookie-banner-closed');
        location.reload();
    }
});

function clearLocalStorage() {
    if(confirm("Cela effacera vos préférences. Continuer ?")) {
        localStorage.clear();
        location.reload();
    }
}