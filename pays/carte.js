import { countriesData } from './data.js';

// Variable globale pour stocker l'instance de la carte
let cartePays = null;

const afficherDonneesPays = () => {
    const params = new URLSearchParams(window.location.search);
    const countryId = params.get('id'); 

    const cleanCountryId = countryId ? countryId.toLowerCase() : null;
    const currentLang = typeof getCurrentLang === "function" ? getCurrentLang() : "fr";

    if (cleanCountryId && countriesData[cleanCountryId]) {
        const dataPays = countriesData[cleanCountryId];
        const trad = dataPays[currentLang] || dataPays["fr"];

        // 1. Remplissage des textes et images existants
        const titleEl = document.getElementById('country-title');

        const descEl = document.getElementById('country-desc');
        if (descEl) descEl.textContent = trad.desc;

        const capitalEl = document.getElementById('api-country-capital');
        if (capitalEl) capitalEl.textContent = trad.capitale || "—";

        const popEl = document.getElementById('api-country-population');
        if (popEl) popEl.textContent = trad.population || "—";

        const currencyEl = document.getElementById('api-country-currency');
        if (currencyEl) currencyEl.textContent = trad.monnaie || "—";

        const landscapeEl = document.getElementById('api-landscape-image') || document.querySelector('.api-landscape-image');
        if (landscapeEl && dataPays.landscape) {
            landscapeEl.src = dataPays.landscape;
        }

        const flagEl = document.getElementById('api-country-flag');
        if (flagEl && dataPays.image) {
            flagEl.src = dataPays.image;
        }

        // 2. Gestion de la carte OpenStreetMap
        const mapContainer = document.getElementById('map');
        if (mapContainer && dataPays.coords) {
            // Si une carte existe déjà, on la détruit pour éviter les conflits d'initialisation
            if (cartePays !== null) {
                cartePays.remove();
            }

            // Initialise la carte sur les coordonnées du pays avec un zoom adapté (niveau 5)
            cartePays = L.map('map').setView(dataPays.coords, 5);

            // Charge le design des tuiles OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(cartePays);

            // Ajoute un marqueur rouge/bleu sur le centre du pays
            L.marker(dataPays.coords).addTo(cartePays)
                .bindPopup(`<b>${trad.name}</b><br>${trad.capitale}`)
                .openPopup();
        }

    } else {
        const titleEl = document.getElementById('country-title');
        if (titleEl) titleEl.textContent = "Pays introuvable";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    afficherDonneesPays();
});