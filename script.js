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
    if (!track) return;

    // --- CONFIGURATION ---
    const username = "Thimeo-dev"; // Remplace par ton pseudo GitHub
    const repo = "Agence.ch";     // Remplace par le nom de ton projet
    const folder = "images";      // Le nom du dossier où sont tes images

    try {
        // 1. On appelle l'API GitHub pour lister les fichiers du dossier
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${folder}`);
        const files = await response.json();

        // 2. On filtre pour ne garder que les images (jpg, png, webp)
        const images = files.filter(file => 
            file.name.match(/\.(jpe?g|png|gif|webp)$/i)
        );

        // 3. On crée les éléments dans le slider
        images.forEach(img => {
            const rect = document.createElement('div');
            rect.className = 'dest-rect';
            
            // On utilise download_url qui est l'adresse directe du fichier
            rect.innerHTML = `
                <img src="${img.download_url}" alt="${img.name}">
            `;
            track.appendChild(rect);
        });

        // 4. On double le contenu pour le scroll infini
        const originalContent = track.innerHTML;
        track.innerHTML = originalContent + originalContent;

    } catch (error) {
        console.error("Erreur lors de la récupération des images GitHub:", error);
    }
});