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

export const chargerMeteo7Jours = async (coords) => {
    const forecastEl = document.getElementById('weather-forecast');
    if (!forecastEl) return;

    if (!coords || !Array.isArray(coords) || coords.length < 2) {
        forecastEl.innerHTML = `<p class="weather-loading">Coordonnées météo invalides.</p>`;
        return;
    }

    forecastEl.innerHTML = `<p class="weather-loading">Chargement de la météo...</p>`;

    try {
        const [lat, lon] = coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Open-Meteo status ${response.status}`);
        }

        const data = await response.json();
        if (!data?.daily?.time?.length) {
            throw new Error('Réponse météo invalide');
        }

        forecastEl.innerHTML = "";

        const jours = Math.min(7, data.daily.time.length);
        for (let index = 0; index < jours; index += 1) {
            const dateFormatee = formatJour(data.daily.time[index]);
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
        }
    } catch (error) {
        console.error('Erreur météo :', error);
        forecastEl.innerHTML = `<p class="weather-loading">Impossible de charger la météo.</p>`;
    }
};
