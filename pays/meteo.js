import { countriesData } from './data.js';

let cartePays = null;

// Fonction pour convertir les codes Open-Meteo en émojis météo
const getWmoEmoji = (code) => {
    if (code === 0) return "☀️"; // Ciel dégagé
    if (code >= 1 && code <= 3) return "⛅"; // Nuageux
    if (code >= 45 && code <= 48) return "🌫️"; // Brouillard
    if (code >= 51 && code <= 67) return "🌧️"; // Pluie / Bruine
    if (code >= 71 && code <= 77) return "❄️"; // Neige
    if (code >= 80 && code <= 82) return "🌦️"; // Averses
    if (code >= 95 && code <= 99) return "🌩️"; // Orage
    return "☀️";
};

// Fonction pour formater la date proprement (ex: "lun. 25")
const formatJour = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
};

// Nouvelle fonction pour charger la météo depuis Open-Meteo
const chargerMeteo7Jours = async (coords) => {
    const forecastEl = document.getElementById('weather-forecast');
    if (!forecastEl) return;

    if (!coords || !Array.isArray(coords) || coords.length < 2) {
        forecastEl.innerHTML = `<p class="weather-loading">Coordonnées météo invalides.</p>`;
        return;
    }

    try {
        const [lat, lon] = coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Open-Meteo status ${response.status}`);
        }

        const data = await response.json();
        if (!data || !data.daily || !Array.isArray(data.daily.time)) {
            throw new Error('Réponse météo invalide');
        }

        forecastEl.innerHTML = ""; // Supprime le message "Chargement..."

        // Boucle pour générer l'affichage des jours reçus
        data.daily.time.forEach((jour, index) => {
            const dateFormatee = formatJour(jour);
            const emoji = getWmoEmoji(data.daily.weathercode[index]);
            const tempMax = Math.round(data.daily.temperature_2m_max[index]);
            const tempMin = Math.round(data.daily.temperature_2m_min[index]);

            const row = document.createElement('div');
            row.className = 'weather-day-row';
            row.innerHTML = `
                <span class="weather-date">${dateFormatee}</span>
                <span class="weather-icon">${emoji}</span>
                <span class="weather-temps">
                    <span class="weather-max">${tempMax}°</span>
                    <span class="weather-min">${tempMin}°</span>
                </span>
            `;
            forecastEl.appendChild(row);
        });
    } catch (error) {
        console.error("Erreur météo :", error);
        forecastEl.innerHTML = `<p class="weather-loading">Impossible de charger la météo.</p>`;
    }
};

const afficherDonneesPays = async () => {
    const params = new URLSearchParams(window.location.search);
    const countryId = params.get('id'); 

    const cleanCountryId = countryId ? countryId.toLowerCase() : null;
    const currentLang = typeof getCurrentLang === "function" ? getCurrentLang() : "fr";

    if (cleanCountryId && countriesData[cleanCountryId]) {
        const dataPays = countriesData[cleanCountryId];
        const trad = dataPays[currentLang] || dataPays["fr"];

        // Remplissage texte standard


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

        // --- APPEL DE LA METEO ---
        if (dataPays.coords) {
            await chargerMeteo7Jours(dataPays.coords);
        }
    } else {
        const titleEl = document.getElementById('country-title');
        if (titleEl) titleEl.textContent = "Pays introuvable";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    afficherDonneesPays();
});