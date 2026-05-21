// 1. Importation des données depuis ton fichier data.js
import { countriesData } from './data.js';

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

        // Capitale (si elle existe dans ton objet, sinon met "Non renseignée")
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

        // Vignette du drapeau
        const flagEl = document.getElementById('api-country-flag');
        if (flagEl && dataPays.image) {
            flagEl.src = dataPays.image;
            flagEl.alt = `Drapeau ${trad.name}`;
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