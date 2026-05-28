// On attend que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", () => {
    
    // On sélectionne tous les cadres de miniatures
    const containers = document.querySelectorAll('.youtube-thumbnail-wrapper');

    containers.forEach(container => {
        // Au clic : on lance la vidéo en plein écran
        container.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            
            // Si une vidéo est déjà en cours de lecture dans ce conteneur, on ne fait rien
            if (this.querySelector('iframe')) return;

            if (videoId) {
                // 1. On injecte l'iframe dynamique avec l'autoplay activé
                this.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                    </iframe>
                `;

                // 2. On sélectionne l'iframe créée
                const iframe = this.querySelector('iframe');

                // 3. On demande le plein écran immédiat
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) { /* Safari */
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) { /* IE / Edge */
                    iframe.msRequestFullscreen();
                }
            }
        });
    });

    // 🎯 ÉCOUTEUR GLOBAL : Détecte quand on change ou quitte le mode plein écran
    const handleFullscreenChange = () => {
        // Si aucun élément n'est actuellement en plein écran
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            
            // On parcourt tous les conteneurs pour réinitialiser celui qui a l'iframe active
            containers.forEach(container => {
                const iframe = container.querySelector('iframe');
                if (iframe) {
                    const videoId = container.getAttribute('data-video-id');
                    // On remet la miniature propre d'origine, ce qui détruit l'iframe et coupe le son
                    container.innerHTML = `
                        <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="Miniature YouTube" class="youtube-pure-thumbnail">
                    `;
                }
            });
        }
    };

    // Ajout de l'événement pour tous les types de navigateurs
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); /* Safari */
    document.addEventListener('msfullscreenchange', handleFullscreenChange); /* IE / Edge */

});