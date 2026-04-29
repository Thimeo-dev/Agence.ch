const authForm = document.getElementById('auth-form');

if (authForm) {
    authForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche la page de se recharger

        const email = document.getElementById('email_field').value;
        const password = document.getElementById('password_field').value;

        console.log("Tentative de connexion avec :", email);
        // Authentification réelle gérée par auth-script.js
    });
}$document.addEventListener("DOMContentLoaded", async () => {
    const track = document.getElementById('slider-track');
    if (!track) {
        console.error("L'élément slider-track est introuvable dans le HTML !");
        return;
    }

    const username = "Thimeo-dev"; // Remplace par ton nom d'utilisateur GitHub
    const repo = "Agence.ch";     
    const folder = "images";      

    try {
        console.log("Tentative de connexion à GitHub...");
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${folder}`);
        const files = await response.json();

        if (files.message === "Not Found") {
            console.error("Dossier ou dépôt introuvable. Vérifie l'URL.");
            return;
        }

        const images = files.filter(f => f.name.match(/\.(jpe?g|png|webp)$/i));
        console.log(`${images.length} images trouvées.`);

        track.innerHTML = ""; 

        images.forEach(img => {
            const name = img.name.split('.').shift().replace(/-/g, ' ');
            const rect = document.createElement('div');
            rect.className = 'dest-rect';
            rect.innerHTML = `
                <img src="${img.download_url}" alt="${name}" style="width:100%; height:100%; object-fit:cover;">
                <div class="dest-label" style="position:absolute; bottom:0; width:100%; padding:20px; background:linear-gradient(transparent, rgba(0,0,0,0.8)); color:white;">
                    <span style="font-weight:600;">${name}</span>
                </div>
            `;
            track.appendChild(rect);
        });

        // On force le doublement pour le scroll
        if (images.length > 0) {
            track.innerHTML += track.innerHTML;
            console.log("Images doublées, le scroll devrait démarrer.");
        }

    } catch (e) {
        console.error("Erreur fatale :", e);
    }
});