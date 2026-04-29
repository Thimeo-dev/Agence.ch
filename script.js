const authForm = document.getElementById('auth-form');

if (authForm) {
    authForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche la page de se recharger

        const email = document.getElementById('email_field').value;
        const password = document.getElementById('password_field').value;

        console.log("Tentative de connexion avec :", email);
        // Authentification réelle gérée par auth-script.js
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const track = document.getElementById('slider-track');
    if (!track) {
        console.error("L'élément slider-track est introuvable !");
        return;
    }

    const username = "Thimeo-dev"; 
    const repo = "Agence.ch";     
    const folder = "images";      

    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${folder}`);
        const files = await response.json();

        if (files.message === "Not Found") {
            console.error("Dossier images introuvable sur GitHub.");
            return;
        }

        // On ne garde que les images
        const images = files.filter(f => f.name.match(/\.(jpe?g|png|webp|gif)$/i));

        // On vide le rail avant d'injecter
        track.innerHTML = ""; 

        images.forEach(img => {
            const name = decodeURIComponent(img.name.split('.').shift().replace(/-/g, ' '));
            const rect = document.createElement('div');
            rect.className = 'dest-rect';
            rect.innerHTML = `
                <img src="${img.download_url}" alt="${name}">
                <div class="dest-label">
                    <span>${name}</span>
                </div>
            `;
            track.appendChild(rect);
        });

        // TRÈS IMPORTANT : On double le contenu pour que le défilement soit infini
        if (images.length > 0) {
            track.innerHTML += track.innerHTML;
        }

    } catch (e) {
        console.error("Erreur lors du chargement des images :", e);
    }
});