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
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('slider-track');
    if (!track) return;

    // Liste de mots-clés pour l'API Unsplash
    const queries = ['switzerland', 'mountain', 'lake', 'luxury', 'travel', 'hotel'];

    // 1. On crée les premiers rectangles
    const createRects = () => {
        queries.forEach((query, index) => {
            const rect = document.createElement('div');
            rect.className = 'dest-rect';
            rect.innerHTML = `
                <img src="https://source.unsplash.com/random/400x600/?${query}&sig=${index}" alt="Destination">
            `;
            track.appendChild(rect);
        });
    };

    // 2. On génère et on clône immédiatement pour l'effet infini
    createRects();
    const items = track.innerHTML;
    track.innerHTML += items; // On double le contenu
});