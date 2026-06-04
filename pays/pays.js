// 1. Importation des données et du module audio
import { countriesData } from './data.js';
import { chargerHymneNational } from './audio.js'; // On réimporte ta fonction audio !

// Variable globale pour stocker l'instance de la carte Leaflet
let cartePays = null;

// 2. Fonction principale d'affichage
const afficherDonneesPays = () => {
    // Récupère l'id dans l'URL (ex: ?id=albanie)
    const params = new URLSearchParams(window.location.search);
    const countryId = params.get('id'); 

    // Nettoie l'id en minuscules pour correspondre aux clés du dictionnaire
    const cleanCountryId = countryId ? countryId.toLowerCase() : null;

    // Récupère la langue du site (ex: "fr" ou "en"), "fr" par défaut
    const currentLang = typeof getCurrentLang === "function" ? getCurrentLang() : "fr";

    // Met à jour l'indicateur de langue dans le HTML
    const langEl = document.getElementById('current-lang');
    if (langEl) langEl.textContent = currentLang;

    // On vérifie si le pays demandé existe dans notre fichier countriesData
    if (cleanCountryId && countriesData[cleanCountryId]) {
        const dataPays = countriesData[cleanCountryId];
        
        // Sélection de la traduction fr ou en (fallback sur "fr" si la langue n'existe pas)
        const trad = dataPays[currentLang] || dataPays["fr"];

        // --- INJECTION DANS TON HTML ---
        
        // Titre h1
        const titleEl = document.getElementById('country-title');
        if (titleEl) titleEl.textContent = trad.name;

        // Description textuelle
        const descEl = document.getElementById('country-desc');
        if (descEl) descEl.textContent = trad.desc;

        // Capitale (si elle existe dans ton objet, sinon met "—")
        const capitalEl = document.getElementById('api-country-capital');
        if (capitalEl) capitalEl.textContent = trad.capitale || "—";

        // Population
        const popEl = document.getElementById('api-country-population');
        if (popEl) popEl.textContent = trad.population || "—";

        // Monnaie officielle
        const currencyEl = document.getElementById('api-country-currency');
        if (currencyEl) currencyEl.textContent = trad.monnaie || "—";

        // Grand arrière-plan (hero-bg)
        const imageEl = document.getElementById('api-country-image');
        if (imageEl && dataPays.image) {
            imageEl.src = dataPays.image;
            imageEl.alt = `Bannière ${trad.name}`;
        }
        const landscapeEl = document.getElementById('api-landscape-image');
        if (landscapeEl && dataPays.landscape) {
            landscapeEl.src = dataPays.landscape;
            landscapeEl.alt = `Paysage ${trad.name}`;
        }

        // Vignette du drapeau
        const flagEl = document.getElementById('api-country-flag');
        if (flagEl && dataPays.image) {
            flagEl.src = dataPays.image;
            flagEl.alt = `Drapeau ${trad.name}`;
        }

        // --- AUDIO (HYMNE) ---
        // Appel de ton fichier séparé audio.js qui gère le MP3 en minuscules
        chargerHymneNational(cleanCountryId);

        // --- CARTE OPENSTREETMAP ---
        const mapContainer = document.getElementById('map');
        if (mapContainer && dataPays.coords) {
            // Si une carte existe déjà, on la détruit pour éviter les bugs d'initialisation
            if (cartePays !== null) {
                cartePays.remove();
            }

            // Initialise la carte sur les coordonnées du pays avec l'option plein écran 100vw
            cartePays = L.map('map', {
                minZoom: 2,
                maxZoom: 18,
                worldCopyJump: true
            }).setView(dataPays.coords, 5);

            // Charge les tuiles de la carte (sans répétition infinie sur les côtés)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                noWrap: true
            }).addTo(cartePays);

            // Ajoute le marqueur au centre du pays
            L.marker(dataPays.coords).addTo(cartePays)
                .bindPopup(`<b>${trad.name}</b><br>${trad.capitale || ""}`)
                .openPopup();

            // Force la carte à s'ajuster correctement tout en bas selon ton CSS
            setTimeout(() => {
                if (cartePays) {
                    cartePays.invalidateSize();
                }
            }, 150);
        }

    } else {
        // Si le paramètre URL est vide ou faux
        const titleEl = document.getElementById('country-title');
        if (titleEl) titleEl.textContent = "Pays introuvable";
        
        const descEl = document.getElementById('country-desc');
        if (descEl) descEl.textContent = "Désolé, aucune donnée locale n'est disponible pour cette destination.";
    }
};

// 3. Lancement automatique au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    afficherDonneesPays();
});